import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { NPC_WEARABLES } from "lib/npcs";
import React, { useState } from "react";
import { DeliveryPanelContent } from "../deliveries/DeliveryPanelContent";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { useRandomItem } from "lib/utils/hooks/useRandomItem";
import { npcDialogues, defaultDialogue } from "../deliveries/dialogues";
import { BeachBaitShop } from "../beach/BeachBaitShop";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { OuterPanel } from "components/ui/Panel";
import fishingLure from "assets/composters/fishing_lure.png";

interface Props {
  onClose: () => void;
}

export const Finn: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState(0);
  const [confirmAction, setConfirmAction] = useState(false);
  const dialogue = npcDialogues.finn || defaultDialogue;
  const intro = useRandomItem(dialogue.intro);
  const { t } = useAppTranslation();

  const handleConfirm = (tab: number) => {
    setConfirmAction(true);
    setTab(tab);
  };

  if (!confirmAction) {
    return (
      <SpeakingModal
        onClose={onClose}
        bumpkinParts={NPC_WEARABLES.finn}
        message={[
          {
            text: intro,
            actions: [
              {
                text: t("delivery"),
                cb: () => handleConfirm(0),
              },
              {
                text: t("buy"),
                cb: () => handleConfirm(1),
              },
            ],
          },
        ]}
      />
    );
  }

  return (
    <CloseButtonPanel
      onClose={onClose}
      bumpkinParts={NPC_WEARABLES.finn}
      container={OuterPanel}
      tabs={[
        { icon: SUNNYSIDE.icons.expression_chat, name: t("delivery") },
        { icon: fishingLure, name: t("buy") },
      ]}
      setCurrentTab={setTab}
      currentTab={tab}
    >
      {tab === 0 && <DeliveryPanelContent npc="finn" />}
      {tab === 1 && <BeachBaitShop />}
    </CloseButtonPanel>
  );
};
