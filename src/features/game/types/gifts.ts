import { NPCName } from "lib/npcs";
import { BB_TO_GEM_RATIO, InventoryItemName, Wardrobe } from "./game";
import { FlowerName } from "./flowers";
import { RecipeItemName } from "../lib/crafting";

type GiftPoints = Partial<Record<FlowerName, number>>;

/**
 * Flowers that Bumpkins particularly desire
 * Otherwise, they will get default flower points
 */
export const BUMPKIN_FLOWER_BONUSES: Partial<Record<NPCName, GiftPoints>> = {
  betty: {
    "Red Pansy": 5,
    "Yellow Pansy": 5,
    "Purple Pansy": 5,
    "White Pansy": 5,
    "Blue Pansy": 5,
  },
  "pumpkin' pete": { "Yellow Cosmos": 6 },
  blacksmith: { "Red Carnation": 5 },
  bert: {
    "Red Lotus": 6,
    "Yellow Lotus": 6,
    "Purple Lotus": 6,
    "White Lotus": 6,
    "Blue Lotus": 6,
  },
  finley: {
    "Red Daffodil": 5,
    "Yellow Daffodil": 5,
    "Purple Daffodil": 5,
    "White Daffodil": 5,
    "Blue Daffodil": 5,
  },
  raven: {
    "Purple Carnation": 6,
    "Purple Lotus": 5,
    "Purple Daffodil": 4,
    "Purple Pansy": 4,
    "Purple Cosmos": 4,
    "Purple Balloon Flower": 4,
    "Purple Gladiolus": 3,
    "Purple Lavender": 4,
    "Purple Clover": 3,
    "Purple Edelweiss": 4,
  },
  "old salty": {
    "Blue Carnation": 6,
    "Blue Lotus": 5,
    "Blue Daffodil": 4,
    "Blue Pansy": 4,
    "Blue Balloon Flower": 5,
    "Blue Cosmos": 4,
    "Blue Gladiolus": 4,
    "Blue Lavender": 3,
    "Blue Clover": 4,
    "Blue Edelweiss": 3,
  },
  miranda: {
    "Yellow Carnation": 6,
    "Yellow Lotus": 5,
    "Yellow Daffodil": 4,
    "Yellow Pansy": 4,
    "Yellow Balloon Flower": 5,
    "Yellow Cosmos": 4,
    "Yellow Gladiolus": 4,
    "Yellow Lavender": 4,
    "Yellow Clover": 4,
    "Yellow Edelweiss": 4,
  },
  finn: { "White Cosmos": 5, "Blue Cosmos": 5 },
  corale: { "Prism Petal": 6 },
  cornwell: {
    "Red Balloon Flower": 5,
    "Yellow Balloon Flower": 5,
    "Purple Balloon Flower": 5,
    "White Balloon Flower": 5,
    "Blue Balloon Flower": 5,
  },
  tywin: { "Primula Enigma": 7, "Celestial Frostbloom": 6 },
  victoria: { "Primula Enigma": 8 },
  jester: { "Red Balloon Flower": 6, "Red Carnation": 6 },
};

export const DEFAULT_FLOWER_POINTS: Record<FlowerName, number> = {
  "Red Pansy": 3,
  "Yellow Pansy": 3,
  "Purple Pansy": 3,
  "White Pansy": 3,
  "Blue Pansy": 3,
  "Red Cosmos": 3,
  "Yellow Cosmos": 3,
  "Purple Cosmos": 3,
  "White Cosmos": 3,
  "Blue Cosmos": 3,
  "Red Balloon Flower": 5,
  "Yellow Balloon Flower": 5,
  "Purple Balloon Flower": 5,
  "White Balloon Flower": 5,
  "Blue Balloon Flower": 5,
  "Red Carnation": 5,
  "Yellow Carnation": 5,
  "Purple Carnation": 5,
  "White Carnation": 5,
  "Blue Carnation": 5,
  "Red Daffodil": 7,
  "Yellow Daffodil": 7,
  "Purple Daffodil": 7,
  "White Daffodil": 7,
  "Blue Daffodil": 7,
  "Red Lotus": 7,
  "Yellow Lotus": 7,
  "Purple Lotus": 7,
  "White Lotus": 7,
  "Blue Lotus": 7,
  "Prism Petal": 12,
  "Celestial Frostbloom": 12,
  "Primula Enigma": 12,

  "Red Edelweiss": 4,
  "Yellow Edelweiss": 4,
  "Purple Edelweiss": 4,
  "White Edelweiss": 4,
  "Blue Edelweiss": 4,
  "Red Gladiolus": 4,
  "Yellow Gladiolus": 4,
  "Purple Gladiolus": 4,
  "White Gladiolus": 4,
  "Blue Gladiolus": 4,
  "Red Lavender": 4,
  "Yellow Lavender": 4,
  "Purple Lavender": 4,
  "White Lavender": 4,
  "Blue Lavender": 4,
  "Red Clover": 4,
  "Yellow Clover": 4,
  "Purple Clover": 4,
  "White Clover": 4,
  "Blue Clover": 4,
};

export type BumpkinGift = {
  friendshipPoints: number;
  items: Partial<Record<InventoryItemName, number>>;
  coins: number;
  wearables: Wardrobe;
  recipe?: RecipeItemName;
};

type BumpkinGifts = {
  planned: BumpkinGift[];
  repeats: BumpkinGift;
};

export const BUMPKIN_GIFTS: Partial<Record<NPCName, BumpkinGifts>> = {
  "pumpkin' pete": {
    planned: [
      {
        friendshipPoints: 5,
        items: {},
        coins: 160,
        wearables: {},
      },
      {
        friendshipPoints: 12,
        items: {
          "Treasure Key": 1,
        },
        coins: 0,
        wearables: {},
      },
      {
        friendshipPoints: 50,
        items: {},
        wearables: { "Pumpkin Hat": 1 },
        coins: 0,
      },
      {
        friendshipPoints: 100,
        items: {},
        coins: 640,
        wearables: {},
      },
    ],
    repeats: {
      friendshipPoints: 100,
      items: { "Treasure Key": 1 },
      coins: 640,
      wearables: {},
    },
  },
  betty: {
    planned: [
      {
        friendshipPoints: 10,
        items: {},
        coins: 120,
        wearables: {},
      },
      {
        friendshipPoints: 20,
        items: {},
        coins: 960,
        wearables: {},
        recipe: "Basic Bed",
      },
      {
        friendshipPoints: 40,
        items: { "Treasure Key": 1 },
        coins: 0,
        wearables: {},
        recipe: "Doll",
      },
      {
        friendshipPoints: 110,
        items: { "Radish Cake": 1 },
        coins: 0,
        wearables: {},
        recipe: "Buzz Doll",
      },
    ],
    repeats: {
      friendshipPoints: 100,
      items: { "Treasure Key": 1 },
      coins: 0,
      wearables: {},
    },
  },
  blacksmith: {
    planned: [
      {
        friendshipPoints: 50,
        items: { "Treasure Key": 1 },
        coins: 0,
        wearables: {},
        recipe: "Timber",
      },
      {
        friendshipPoints: 110,
        items: {},
        coins: 760,
        wearables: {},
        recipe: "Cushion",
      },
      {
        friendshipPoints: 200,
        items: {},
        coins: 1600,
        wearables: {},
        recipe: "Hardened Leather",
      },
      {
        friendshipPoints: 320,
        items: { Pickaxe: 10 },
        coins: 0,
        wearables: {},
        recipe: "Crimsteel",
      },
    ],
    repeats: {
      friendshipPoints: 150,
      items: { "Treasure Key": 1 },
      coins: 960,
      wearables: {},
      recipe: "Crude Doll",
    },
  },
  bert: {
    planned: [
      {
        friendshipPoints: 60,
        items: {},
        coins: 0,
        wearables: {
          "Tattered Jacket": 1,
        },
        recipe: "Wooly Doll",
      },
      {
        friendshipPoints: 100,
        items: { Gem: BB_TO_GEM_RATIO * 1 },
        coins: 0,
        wearables: {},
        recipe: "Cluck Doll",
      },
      {
        friendshipPoints: 210,
        items: { "Pirate Cake": 3 },
        coins: 0,
        wearables: {},
        recipe: "Cow Bed",
      },
      {
        friendshipPoints: 330,
        items: {},
        coins: 0,
        wearables: {
          "Greyed Glory": 1,
        },
        recipe: "Moo Doll",
      },
    ],
    repeats: {
      friendshipPoints: 150,
      items: { "Rare Key": 1 },
      coins: 0,
      wearables: {},
    },
  },
  finley: {
    planned: [
      {
        friendshipPoints: 25,
        items: { "Fishing Lure": 3 },
        coins: 0,
        wearables: {},
        recipe: "Fisher Bed",
      },
      {
        friendshipPoints: 95,
        items: {},
        coins: 3200,
        wearables: {},
      },
      {
        friendshipPoints: 150,
        items: { Tuna: 5 },
        coins: 0,
        wearables: {},
      },
    ],
    repeats: {
      friendshipPoints: 100,
      items: { "Fishing Lure": 5 },
      coins: 0,
      wearables: {},
    },
  },
  raven: {
    planned: [
      {
        friendshipPoints: 50,
        items: { "Time Warp Totem": 1 },
        coins: 0,
        wearables: {},
      },
      {
        friendshipPoints: 140,
        items: {},
        coins: 2560,
        wearables: {},
        recipe: "Lunar Doll",
      },
      {
        friendshipPoints: 220,
        items: {},
        coins: 0,
        wearables: { "Victorian Hat": 1 },
      },
      {
        friendshipPoints: 330,
        items: { "Eggplant Seed": 50 },
        coins: 1600,
        wearables: {},
        recipe: "Shadow Doll",
      },
      {
        friendshipPoints: 700,
        items: {},
        coins: 0,
        wearables: {
          "Bat Wings": 1,
        },
      },
    ],
    repeats: {
      friendshipPoints: 160,
      items: { "Rare Key": 1 },
      coins: 0,
      wearables: {},
    },
  },
  miranda: {
    planned: [
      {
        friendshipPoints: 30,
        items: { "Time Warp Totem": 1 },
        coins: 0,
        wearables: {},
        recipe: "Floral Bed",
      },
      {
        friendshipPoints: 90,
        items: {},
        coins: 960,
        wearables: {
          "Fruit Picker Shirt": 1,
        },
      },
      {
        friendshipPoints: 260,
        items: {},
        coins: 0,
        wearables: { "Fruit Picker Apron": 1 },
        recipe: "Desert Bed",
      },
      {
        friendshipPoints: 500,
        items: {},
        coins: 6400,
        wearables: { "Fruit Bowl": 1 },
        recipe: "Juicy Doll",
      },
    ],
    repeats: {
      friendshipPoints: 100,
      items: {
        "Blueberry Seed": 5,
        "Apple Seed": 5,
        "Banana Plant": 5,
        "Orange Seed": 5,
      },
      coins: 0,
      wearables: {},
    },
  },
  finn: {
    planned: [
      {
        friendshipPoints: 40,
        items: { Rod: 10 },
        coins: 0,
        wearables: {},
      },
      {
        friendshipPoints: 150,
        items: {},
        coins: 960,
        wearables: {},
      },
    ],
    repeats: {
      friendshipPoints: 130,
      items: { "Rare Key": 1 },
      coins: 0,
      wearables: {},
    },
  },
  corale: {
    planned: [
      {
        friendshipPoints: 45,
        items: {},
        coins: 960,
        wearables: {},
      },
      {
        friendshipPoints: 150,
        items: { Gem: BB_TO_GEM_RATIO * 2 },
        coins: 0,
        wearables: {},
        recipe: "Synthetic Fabric",
      },
      {
        friendshipPoints: 320,
        items: {},
        coins: 0,
        wearables: { "Pink Ponytail": 1 },
        recipe: "Kelp Fibre",
      },
    ],
    repeats: {
      friendshipPoints: 200,
      items: {},
      coins: 3200,
      wearables: {},
    },
  },
  cornwell: {
    planned: [
      {
        friendshipPoints: 65,
        items: { "Rare Key": 1 },
        coins: 0,
        wearables: {},
        recipe: "Sturdy Bed",
      },
      {
        friendshipPoints: 175,
        items: { Gem: BB_TO_GEM_RATIO * 1 },
        coins: 0,
        wearables: {},
      },
      {
        friendshipPoints: 340,
        items: {},
        coins: 0,
        wearables: { "Wise Robes": 1 },
        recipe: "Harvest Doll",
      },
      {
        friendshipPoints: 600,
        items: {},
        coins: 0,
        wearables: { "Wise Beard": 1 },
        recipe: "Ember Doll",
      },
    ],
    repeats: {
      friendshipPoints: 200,
      items: { "Luxury Key": 1 },
      coins: 0,
      wearables: {},
    },
  },

  tywin: {
    planned: [
      {
        friendshipPoints: 35,
        items: { "Rare Key": 1 },
        coins: 0,
        wearables: {},
      },
      {
        friendshipPoints: 175,
        items: {},
        coins: 3200,
        wearables: {},
      },
      {
        friendshipPoints: 330,
        items: { "Pirate Cake": 5 },
        coins: 0,
        wearables: {},
      },
    ],
    repeats: {
      friendshipPoints: 160,
      items: { "Luxury Key": 1 },
      coins: 0,
      wearables: {},
    },
  },

  victoria: {
    planned: [
      {
        friendshipPoints: 50,
        items: {},
        coins: 2560,
        wearables: {},
      },
      {
        friendshipPoints: 140,
        items: {
          "Time Warp Totem": 1,
        },
        coins: 0,
        wearables: {},
        recipe: "Royal Bed",
      },
      {
        friendshipPoints: 340,
        items: {},
        coins: 0,
        wearables: { "Royal Dress": 1 },
      },
      {
        friendshipPoints: 520,
        items: {},
        coins: 16000,
        wearables: {},
      },
      {
        friendshipPoints: 850,
        items: {},
        coins: 0,
        wearables: {
          "Queen's Crown": 1,
        },
      },
    ],
    repeats: {
      friendshipPoints: 160,
      items: { "Rare Key": 1 },
      coins: 0,
      wearables: {},
    },
  },

  jester: {
    planned: [
      {
        friendshipPoints: 50,
        items: {
          "Time Warp Totem": 1,
        },
        coins: 0,
        wearables: {},
        recipe: "Royal Bedding",
      },
      {
        friendshipPoints: 140,
        items: {
          "Rare Key": 1,
        },
        coins: 0,
        wearables: {},
        recipe: "Royal Ornament",
      },
      {
        friendshipPoints: 340,
        items: {},
        coins: 0,
        wearables: { "Cap n Bells": 1 },
      },
      {
        friendshipPoints: 520,
        items: {},
        coins: 16000,
        wearables: {},
      },
      {
        friendshipPoints: 740,
        items: {},
        coins: 0,
        wearables: {
          Motley: 1,
        },
      },
    ],
    repeats: {
      friendshipPoints: 90,
      items: { "Treasure Key": 1 },
      coins: 0,
      wearables: {},
    },
  },
  "old salty": {
    planned: [
      {
        friendshipPoints: 30,
        items: {},
        coins: 80,
        wearables: {
          "Striped Blue Shirt": 1,
        },
      },
      {
        friendshipPoints: 90,
        items: {},
        coins: 260,
        wearables: {
          "Peg Leg": 1,
        },
        recipe: "Gilded Doll",
      },
      {
        friendshipPoints: 500,
        items: {},
        coins: 0,
        wearables: { "Pirate Potion": 1 },
        recipe: "Pirate Bed",
      },
      {
        friendshipPoints: 850,
        items: {
          "Pirate Bounty": 1,
        },
        coins: 0,
        wearables: { "Pirate Hat": 1 },
        recipe: "Ocean's Treasure",
      },
    ],
    repeats: {
      friendshipPoints: 250,
      items: {},
      coins: 2500,
      wearables: {},
    },
  },
};
