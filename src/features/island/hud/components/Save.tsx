import React, { useContext, useEffect, useState } from "react";
import { PIXEL_SCALE } from "features/game/lib/constants";

import saveIcon from "assets/icons/save.webp";
import loadingIcon from "assets/icons/timer.gif";
import { Context } from "features/game/GameProvider";
import { useSelector } from "@xstate/react";
import { SUNNYSIDE } from "assets/sunnyside";
import { MachineState } from "features/game/lib/gameMachine";
import { RoundButton } from "components/ui/RoundButton";
import classNames from "classnames";

type ButtonState = "unsaved" | "inProgress" | "saved";

const _playing = (state: MachineState) => state.matches("playing");
const _autosaving = (state: MachineState) => state.matches("autosaving");
const _hasUnsavedProgress = (state: MachineState) =>
  state.context.actions.length > 0;

export const Save: React.FC = () => {
  const { gameService } = useContext(Context);

  const playing = useSelector(gameService, _playing);
  const autoSaving = useSelector(gameService, _autosaving);
  const hasUnsavedProgress = useSelector(gameService, _hasUnsavedProgress);
  const savedWithoutError = playing && !hasUnsavedProgress;

  const [enableButton, setEnableButton] = useState<boolean>(false);
  const [disableSaveButtonTimer, setDisableSaveButtonTimer] =
    useState<number>();

  const showSaved = savedWithoutError && enableButton;
  const buttonState: ButtonState = autoSaving
    ? "inProgress"
    : showSaved
      ? "saved"
      : "unsaved";

  useEffect(() => {
    // enable button when there are unsaved progress
    if (hasUnsavedProgress) {
      setEnableButton(true);
      setDisableSaveButtonTimer(
        clearTimeout(disableSaveButtonTimer) as undefined,
      );
    }

    // disable button after 2 seconds when changes are saved
    if (showSaved) {
      setDisableSaveButtonTimer(
        window.setTimeout(() => setEnableButton(false), 2000),
      );
    }

    return () => clearTimeout(disableSaveButtonTimer);
  }, [hasUnsavedProgress, savedWithoutError]);

  const save = () => {
    gameService.send("SAVE");
  };

  return (
    <RoundButton
      onClick={enableButton ? save : undefined}
      disabled={!enableButton || buttonState !== "unsaved"}
    >
      {buttonState === "unsaved" && (
        <img
          src={saveIcon}
          className={classNames("absolute group-active:translate-y-[2px]", {
            "opacity-50": !enableButton,
          })}
          style={{
            top: `${PIXEL_SCALE * 4}px`,
            left: `${PIXEL_SCALE * 5}px`,
            width: `${PIXEL_SCALE * 12}px`,
          }}
        />
      )}
      {buttonState === "inProgress" && (
        <img
          src={loadingIcon}
          className="absolute group-active:translate-y-[2px]"
          style={{
            top: `${PIXEL_SCALE * 5}px`,
            left: `${PIXEL_SCALE * 7}px`,
            width: `${PIXEL_SCALE * 8}px`,
          }}
        />
      )}
      {buttonState === "saved" && (
        <img
          src={SUNNYSIDE.icons.confirm}
          className="absolute group-active:translate-y-[2px]"
          style={{
            top: `${PIXEL_SCALE * 5}px`,
            left: `${PIXEL_SCALE * 5}px`,
            width: `${PIXEL_SCALE * 12}px`,
          }}
        />
      )}
    </RoundButton>
  );
};
