import React from "react";

import banner from "assets/decorations/banners/solar_flare_banner.png";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { SFTDetailPopover } from "components/ui/SFTDetailPopover";

export const SolarFlareBanner: React.FC = () => {
  return (
    <SFTDetailPopover name="Solar Flare Banner">
      <>
        <img
          src={banner}
          style={{
            width: `${PIXEL_SCALE * 16}px`,
            bottom: `${PIXEL_SCALE * 2}px`,
            left: `${PIXEL_SCALE * 0}px`,
          }}
          className="absolute"
          alt="Solar Flare Banner"
        />
      </>
    </SFTDetailPopover>
  );
};
