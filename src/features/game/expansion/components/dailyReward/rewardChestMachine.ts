import { getAccount, switchChain } from "@wagmi/core";
import { NetworkName } from "features/game/events/landExpansion/updateNetwork";
import { config } from "features/wallet/WalletProvider";
import {
  getDailyCode,
  NETWORKS,
  trackDailyReward,
} from "lib/blockchain/DailyReward";
import { wallet } from "lib/blockchain/wallet";
import { ERRORS } from "lib/errors";
import { assign, createMachine, Interpreter, State } from "xstate";

export interface DailyRewardContext {
  lastUsedCode: number;
  bumpkinLevel: number;
  code: number;
  openedAt: number;
  hasAccess: boolean;
  network?: NetworkName;
}

/**
 * The Reward Chest can be opened every 24 hours.
 * A user must first 'unlock' it - submit an onchain transaction
 * A user can then  open it - submit a server request (dailyReward.opened)
 */
export type DailyRewardState = {
  value:
    | "initialising"
    | "idle"
    | "loading"
    | "comingSoon"
    | "locked"
    | "unlocking"
    | "unlocked"
    | "opening"
    | "opened"
    | "error";
  context: DailyRewardContext;
};

export type DailyRewardEvent =
  | { type: "OPEN" }
  | { type: "LOAD" }
  | { type: "UNLOCK" }
  | { type: "ACKNOWLEDGE" }
  | { type: "UPDATE_BUMPKIN_LEVEL"; bumpkinLevel: number }
  | { type: "UPDATE_NETWORK"; network: NetworkName };

export type MachineState = State<
  DailyRewardContext,
  DailyRewardEvent,
  DailyRewardState
>;

export type MachineInterpreter = Interpreter<
  DailyRewardContext,
  any,
  DailyRewardEvent,
  DailyRewardState
>;

export const rewardChestMachine = createMachine<
  DailyRewardContext,
  DailyRewardEvent,
  DailyRewardState
>({
  initial: "initialising",
  states: {
    initialising: {
      always: [
        {
          target: "comingSoon",
          cond: (context) => context.bumpkinLevel < 3,
        },
        {
          target: "opened",
          cond: (context) => {
            if (!context.openedAt) {
              return false;
            }

            // Recently opened
            const today = new Date().toISOString().substring(0, 10);
            return (
              new Date(context.openedAt).toISOString().substring(0, 10) ===
              today
            );
          },
        },
        { target: "idle" },
      ],
    },
    comingSoon: {
      on: {
        UPDATE_BUMPKIN_LEVEL: {
          actions: assign({
            bumpkinLevel: (_, event) => event.bumpkinLevel,
          }),
          target: "initialising",
        },
      },
    },
    idle: {
      on: {
        LOAD: "loading",
      },
    },
    loading: {
      invoke: {
        src: async (context) => {
          const network = context.network;

          if (!network) {
            return { code: context.lastUsedCode };
          }

          const { chain } = getAccount(config);

          if (NETWORKS[network].id !== chain?.id) {
            await switchChain(config, {
              chainId: NETWORKS[network].id as any,
            });
          }

          const code = await getDailyCode(
            wallet.getAccount() as `0x${string}`,
            network,
          );

          return { code };
        },
        onDone: [
          {
            target: "unlocked",
            cond: (context, event) => context.lastUsedCode !== event.data.code,
            actions: assign({
              code: (_, event) => event.data.code,
            }),
          },
          {
            target: "locked",
            actions: assign({
              code: (_, event) => event.data.code,
            }),
          },
        ],
        onError: {
          target: "error",
        },
      },
    },
    locked: {
      on: {
        UNLOCK: "unlocking",
      },
    },
    unlocking: {
      invoke: {
        src: async (context) => {
          const account = wallet.getAccount();
          if (!account) throw new Error("No account");

          if (!context.network) {
            throw new Error("No network");
          }

          const nextCode = (context.code + 1) % 100;
          await trackDailyReward({
            account,
            network: context.network,
            code: nextCode,
          });

          return { nextCode };
        },
        onDone: [
          {
            target: "unlocked",
            cond: (context, event) => context.lastUsedCode !== event.data.code,
            actions: assign({
              code: (_, event) => event.data.nextCode,
            }),
          },
        ],
        onError: [
          {
            target: "loading",
            cond: (_, event: any) =>
              event.data.message === ERRORS.REJECTED_TRANSACTION,
          },
          {
            target: "error",
          },
        ],
      },
    },
    unlocked: {
      on: {
        OPEN: "opening",
      },
    },
    opening: {
      on: {
        ACKNOWLEDGE: "opened",
      },
    },
    opened: {},
    error: {
      on: {
        LOAD: "loading",
      },
    },
  },
  on: {
    UPDATE_NETWORK: {
      actions: assign({
        network: (_, event) => event.network,
      }),
    },
  },
});
