import React, { useState } from "react";
import { isMobile } from "mobile-device-detect";

import { ColorPanel } from "components/ui/Panel";
import { SUNNYSIDE } from "assets/sunnyside";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { useNow } from "lib/utils/hooks/useNow";

const DAY_MS = 24 * 60 * 60 * 1000;
const CORNER_PX = PIXEL_SCALE * 8;
// Push the corner brackets slightly outside the panel edges (like the Box).
const CORNER_INSET = PIXEL_SCALE * 1;

/**
 * A full-width purple "special event" panel used across the market (buy/sell)
 * and the Fire Pit to surface a limited-time crop / recipe. Shows the item icon
 * on the left, a title on the right with a countdown below it, and a select-box
 * border on hover / when selected (matching the {@link Box} component).
 */
export const SpecialEventPanel: React.FC<{
  image: string;
  title: string;
  endDate: Date;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ image, title, endDate, isSelected, onSelect }) => {
  const { t } = useAppTranslation();
  const now = useNow({ live: true, autoEndAt: endDate.getTime() });
  const [isHover, setIsHover] = useState(false);

  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - now) / DAY_MS),
  );

  const showSelectBox = isSelected || (isHover && !isMobile);

  return (
    <div
      className="relative w-full mb-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ColorPanel
        type="vibrant"
        className="w-full p-2 px-3 cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex items-center">
          <img src={image} className="h-8 mr-3" alt={title} />
          <div className="flex flex-col">
            <span className="text-xs">{title}</span>
            <div className="flex items-center whitespace-nowrap">
              <img
                src={SUNNYSIDE.icons.stopwatch}
                className="h-3 mr-1"
                alt="timer"
              />
              <span className="text-xxs">
                {t("chapterCropWeek.daysRemaining", { days: daysRemaining })}
              </span>
            </div>
          </div>
        </div>
      </ColorPanel>

      {/* Selected / hover indicator (matches the Box component) */}
      {showSelectBox && (
        <>
          <img
            className="absolute pointer-events-none"
            src={SUNNYSIDE.ui.selectBoxTL}
            style={{
              top: -CORNER_INSET,
              left: -CORNER_INSET,
              width: `${CORNER_PX}px`,
            }}
          />
          <img
            className="absolute pointer-events-none"
            src={SUNNYSIDE.ui.selectBoxTR}
            style={{
              top: -CORNER_INSET,
              right: -CORNER_INSET,
              width: `${CORNER_PX}px`,
            }}
          />
          <img
            className="absolute pointer-events-none"
            src={SUNNYSIDE.ui.selectBoxBL}
            style={{
              bottom: -CORNER_INSET,
              left: -CORNER_INSET,
              width: `${CORNER_PX}px`,
            }}
          />
          <img
            className="absolute pointer-events-none"
            src={SUNNYSIDE.ui.selectBoxBR}
            style={{
              bottom: -CORNER_INSET,
              right: -CORNER_INSET,
              width: `${CORNER_PX}px`,
            }}
          />
        </>
      )}
    </div>
  );
};
