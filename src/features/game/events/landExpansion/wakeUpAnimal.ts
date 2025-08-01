import { produce } from "immer";
import { ANIMALS, AnimalType } from "features/game/types/animals";
import { Animal, GameState } from "features/game/types/game";
import {
  getAnimalLevel,
  makeAnimalBuildingKey,
} from "features/game/lib/animals";
import { DollName } from "features/game/lib/crafting";
import Decimal from "decimal.js-light";

// Fallback doll
const DEFAULT_TOY: DollName = "Gilded Doll";

/**
 * Returns the toy that an animal will wake up and play with
 */
export function getAnimalToy({ animal }: { animal: Animal }): DollName {
  const level = getAnimalLevel(animal.experience, animal.type);

  if (animal.type === "Chicken") {
    if (level < 6) {
      return "Doll";
    }

    return "Wooly Doll";
  }

  if (animal.type === "Cow") {
    if (level < 6) {
      return "Cluck Doll";
    }

    return "Crude Doll";
  }

  if (animal.type === "Sheep") {
    if (level < 10) {
      return "Lumber Doll";
    }

    return "Moo Doll";
  }

  return DEFAULT_TOY;
}

export type WakeUpAnimalAction = {
  type: "animal.wakeUp";
  animal: AnimalType;
  id: string;
};

type Options = {
  state: Readonly<GameState>;
  action: WakeUpAnimalAction;
  createdAt?: number;
};

export function wakeAnimal({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  return produce(state, (copy) => {
    const { buildingRequired } = ANIMALS[action.animal];
    const buildingKey = makeAnimalBuildingKey(buildingRequired);
    const animal = copy[buildingKey].animals[action.id];

    if (!animal) {
      throw new Error(
        `Animal ${action.id} not found in building ${buildingKey}`,
      );
    }

    if (createdAt > animal.awakeAt) {
      throw new Error("Animal not asleep");
    }

    const toy = getAnimalToy({ animal });

    const amount = copy.inventory[toy] ?? new Decimal(0);

    if (amount.lessThan(1)) {
      throw new Error("Player does not have a doll");
    }

    copy.inventory[toy] = amount.minus(1);

    animal.awakeAt = createdAt;

    return copy;
  });
}
