import Decimal from "decimal.js-light";
import { placeFlowerBed } from "./placeFlowerBed";
import { TEST_FARM } from "features/game/lib/constants";

describe("placeFlowerBed", () => {
  const dateNow = Date.now();
  it("ensures flower bed is in inventory", () => {
    expect(() =>
      placeFlowerBed({
        action: {
          coordinates: {
            x: 1,
            y: 1,
          },
          id: "1",
          type: "flowerBed.placed",
        },
        state: {
          ...TEST_FARM,
          inventory: {
            "Flower Bed": new Decimal(0),
          },
        },
      }),
    ).toThrow("No flower beds available");
  });

  it("ensures flower beds are available", () => {
    expect(() =>
      placeFlowerBed({
        action: {
          coordinates: {
            x: 1,
            y: 1,
          },
          id: "1",
          type: "flowerBed.placed",
        },
        state: {
          ...TEST_FARM,
          inventory: {
            "Flower Bed": new Decimal(1),
          },
          flowers: {
            discovered: {},
            flowerBeds: {
              "123": {
                createdAt: dateNow,
                x: 1,
                y: 1,
              },
            },
          },
        },
      }),
    ).toThrow("No flower beds available");
  });

  it("ensures id does not exist", () => {
    expect(() =>
      placeFlowerBed({
        action: {
          coordinates: {
            x: 2,
            y: 2,
          },
          id: "123",
          type: "flowerBed.placed",
        },
        state: {
          ...TEST_FARM,
          buildings: {},
          inventory: {
            "Flower Bed": new Decimal(2),
          },
          flowers: {
            discovered: {},
            flowerBeds: {
              "123": {
                createdAt: dateNow,
                x: 0,
                y: 0,
              },
            },
          },
        },
      }),
    ).toThrow("ID exists");
  });

  it("places a flower bed", () => {
    const createdAt = dateNow;
    const state = placeFlowerBed({
      action: {
        coordinates: {
          x: 2,
          y: 2,
        },
        id: "1",
        type: "flowerBed.placed",
      },
      state: {
        ...TEST_FARM,
        buildings: {},
        inventory: {
          "Flower Bed": new Decimal(2),
        },
        flowers: {
          discovered: {},
          flowerBeds: {
            "123": {
              createdAt: dateNow,
              x: 0,
              y: 0,
            },
          },
        },
      },
      createdAt,
    });

    expect(state.flowers.flowerBeds).toEqual({
      "1": {
        createdAt,
        x: 2,
        y: 2,
      },
      "123": {
        createdAt,
        x: 0,
        y: 0,
      },
    });
  });

  it("reinstates current progress", () => {
    const createdAt = dateNow;
    const state = placeFlowerBed({
      action: {
        coordinates: {
          x: 2,
          y: 2,
        },
        id: "156", // ID doesn't matter since it's an existing flower bed
        type: "flowerBed.placed",
      },
      state: {
        ...TEST_FARM,
        buildings: {},
        inventory: {
          "Flower Bed": new Decimal(3),
        },
        flowers: {
          flowerBeds: {
            "123": {
              createdAt: dateNow,
              flower: {
                name: "Red Pansy",
                plantedAt: dateNow - 240000,
              },
              removedAt: dateNow - 180000,
            },
            "1": {
              createdAt: dateNow,
              x: 0,
              y: 0,
            },
          },
          discovered: {},
        },
      },
      createdAt,
    });

    expect(state.flowers.flowerBeds["123"].flower?.plantedAt).toBe(
      dateNow - 60000,
    );
  });
});
