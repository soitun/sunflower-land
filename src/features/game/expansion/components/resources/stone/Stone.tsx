import React, { useContext, useEffect, useRef, useState } from "react";

import { STONE_RECOVERY_TIME } from "features/game/lib/constants";
import { Context } from "features/game/GameProvider";

import { getTimeLeft } from "lib/utils/time";
import {
  GameState,
  InventoryItemName,
  Rock,
  Skills,
} from "features/game/types/game";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";
import { useSelector } from "@xstate/react";
import { MachineState } from "features/game/lib/gameMachine";
import Decimal from "decimal.js-light";
import { DepletedStone } from "./components/DepletedStone";
import { DepletingStone } from "./components/DepletingStone";
import { RecoveredStone } from "./components/RecoveredStone";
import { canMine } from "features/game/expansion/lib/utils";
import { useSound } from "lib/utils/hooks/useSound";
import { isCollectibleBuilt } from "features/game/lib/collectibleBuilt";
import {
  getRequiredPickaxeAmount,
  getStoneDropAmount,
} from "features/game/events/landExpansion/stoneMine";

const HITS = 3;
const tool = "Pickaxe";

const HasTool = (
  inventory: Partial<Record<InventoryItemName, Decimal>>,
  gameState: GameState,
) => {
  const { amount: requiredToolAmount } = getRequiredPickaxeAmount(gameState);
  if (requiredToolAmount.lte(0)) return true;
  return (inventory[tool] ?? new Decimal(0)).gte(requiredToolAmount);
};

const selectInventory = (state: MachineState) => state.context.state.inventory;
const compareResource = (prev: Rock, next: Rock) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

const _state = (state: MachineState) => state.context.state;
const _compareQuarryExistence = (prev: GameState, next: GameState) =>
  isCollectibleBuilt({ name: "Quarry", game: prev }) ===
  isCollectibleBuilt({ name: "Quarry", game: next });

const selectSkills = (state: MachineState) =>
  state.context.state.bumpkin?.skills;

const compareSkills = (prev: Skills, next: Skills) =>
  (prev["Tap Prospector"] ?? false) === (next["Tap Prospector"] ?? false);

interface Props {
  id: string;
}

export const Stone: React.FC<Props> = ({ id }) => {
  const { gameService, shortcutItem, showAnimations } = useContext(Context);

  const [touchCount, setTouchCount] = useState(0);

  // When to hide the resource that pops out
  const [collecting, setCollecting] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const harvested = useRef<number>(0);

  const { play: miningFallAudio } = useSound("mining_fall");

  // Reset the touch count when clicking outside of the component
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setTouchCount(0);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const game = useSelector(gameService, _state, _compareQuarryExistence);
  const resource = useSelector(
    gameService,
    (state) => state.context.state.stones[id],
    compareResource,
  );
  const inventory = useSelector(
    gameService,
    selectInventory,
    (prev, next) =>
      HasTool(prev, game) === HasTool(next, game) &&
      (prev.Logger ?? new Decimal(0)).equals(next.Logger ?? new Decimal(0)),
  );
  const skills = useSelector(gameService, selectSkills, compareSkills);

  const hasTool = HasTool(inventory, game);
  const timeLeft = getTimeLeft(resource.stone.minedAt, STONE_RECOVERY_TIME);
  const mined = !canMine(resource, STONE_RECOVERY_TIME);

  useUiRefresher({ active: mined });

  const strike = () => {
    if (!hasTool) return;

    if (!isCollectibleBuilt({ name: "Quarry", game })) {
      shortcutItem(tool);
    }

    if (skills["Tap Prospector"]) {
      // insta-mine the mineral
      return mine();
    }

    setTouchCount((count) => count + 1);
    // need to hit enough times to collect resource
    if (touchCount < HITS - 1) return;

    // can collect resources otherwise
    mine();
    setTouchCount(0);
  };

  const mine = async () => {
    const stoneMined = new Decimal(
      resource.stone.amount ??
        getStoneDropAmount({
          game,
          rock: resource,
          createdAt: Date.now(),
          criticalDropGenerator: (name) =>
            !!(resource.stone.criticalHit?.[name] ?? 0),
        }).amount,
    );

    const newState = gameService.send("stoneRock.mined", {
      index: id,
    });

    if (!newState.matches("hoarding")) {
      if (showAnimations) {
        setCollecting(true);
        harvested.current = stoneMined.toNumber();
      }

      miningFallAudio();

      if (showAnimations) {
        await new Promise((res) => setTimeout(res, 3000));
        setCollecting(false);
        harvested.current = 0;
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Resource ready to collect */}
      {!mined && (
        <div ref={divRef} className="absolute w-full h-full" onClick={strike}>
          <RecoveredStone
            hasTool={hasTool}
            touchCount={touchCount}
            showHelper={false} // FUTURE ENHANCEMENT
          />
        </div>
      )}

      {/* Depleting resource animation */}
      {collecting && <DepletingStone resourceAmount={harvested.current} />}

      {/* Depleted resource */}
      {mined && <DepletedStone timeLeft={timeLeft} />}
    </div>
  );
};
