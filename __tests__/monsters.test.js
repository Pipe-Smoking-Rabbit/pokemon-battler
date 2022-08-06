const { Pokemon, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata } = require("../scripts/monsters");

describe("Pokemon Class", () => {
  test("Should return an instance of the Pokemon class", () => {
    const basicMon = new Pokemon();
    expect(basicMon).toBeInstanceOf(Pokemon);
  });
  test("Returned instance has the name property", () => {
    const mitchsMon = new Pokemon("Ian");
    expect(mitchsMon.name).toBe("Ian");
  });
  test('Returned instance has the type property, defaulting to "normal"', () => {
    const mitchsMon = new Pokemon("Ian");
    expect(mitchsMon.type).toBe("normal");
  });
  test("Returned instance has the hitPoints property", () => {
    const mitchsMon = new Pokemon("Ian");
    expect(mitchsMon.hasOwnProperty("hitPoints")).toBe(true);
  });
  test("Returned instance has the attackDamage property", () => {
    const mitchsMon = new Pokemon("Ian");
    expect(mitchsMon.hasOwnProperty("attackDamage")).toBe(true);
  });
  test('Returned instance has the move property, defaulting to "tackle"', () => {
    const mitchsMon = new Pokemon("Ian");
    expect(mitchsMon.moves).toEqual({
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
    });
  });
  describe("methods", () => {
    test('defendsWellAgainst method returns a boolean if the pokemon is effective against their opponent, "normal" pokemon are not effective against anything', () => {
      const dansMon = new Pokemon("Morapungo");
      const mitchsMon = new Pokemon("Ian");
      expect(dansMon.defendsWellAgainst(mitchsMon)).toBe(false);
    });
    test("takeDamage method will reduce hitpoints by given number", () => {
      const dansMon = new Pokemon("Morapungo");
      dansMon.takeDamage(20);
      expect(dansMon.hitPoints).toBe(80);
      const mitchsMon = new Pokemon("Ian")
      mitchsMon.takeDamage(40);
      expect(mitchsMon.hitPoints).toBe(60);
    });
    test("useMove method will return a number indicating damage delt", () => {
      const dansMon = new Pokemon("Morapungo");
      const mitchsMon = new Pokemon("Ian");
      const selectedMove = {
        name: "tackle",
        type: "normal",
        strength: "basic",
      };
      expect(typeof dansMon.useMove(selectedMove, mitchsMon)).toBe("number");
    });
    test("hasFainted will return a boolean indicating when dead", () => {
      const dansMon = new Pokemon("Morapungo");
      expect(dansMon.hasFainted()).toBe(false);
      dansMon.takeDamage(dansMon.hitPoints - 1);
      expect(dansMon.hasFainted()).toBe(false);
    });
    test("hasFainted returns true when hitPoints has reached 0", () => {
    const dansMon = new Pokemon("Morapungo");
      dansMon.takeDamage(dansMon.hitPoints);
      expect(dansMon.hasFainted()).toBe(true);
    })
  });
});

describe("Fire Class", () => {
  test("Returns an instance of both the Fire class and the Pokemon class", () => {
    const fireBoy = new Fire("Bigshaq");
    expect(fireBoy).toBeInstanceOf(Pokemon);
  });
  test("Returned instance has the type of fire", () => {
    const fireBoy = new Fire("Bigshaq");
    expect(fireBoy.type).toBe("fire");
  });
});
describe("Water Class", () => {
  test("Returns an instance of both the Water class and the Pokemon class", () => {
    const wetMan = new Water("Moist");
    expect(wetMan).toBeInstanceOf(Pokemon);
  });
  test("Returned instance has the type of water", () => {
    const wetMan = new Water("Moist");
    expect(wetMan.type).toBe("water");
  });
});
describe("Grass Class", () => {
  test("Returns an instance of both the Grass class and the Pokemon class", () => {
    const planty = new Grass("Snoop Dogg");
    expect(planty).toBeInstanceOf(Pokemon);
  });
  test("Returned instance has the type of water", () => {
    const planty = new Grass("Snoop Dogg");
    expect(planty.type).toBe("grass");
  });
});

describe("Types appropriately change defendsWellAgainst and defendsPoorlyAgainst", () => {
  test("Returns true or false correctly based on type", () => {
    const planty = new Grass("Snoop Dogg");
    const wetMan = new Water("Moist");
    const fireBoy = new Fire("Bigshaq");

    expect(planty.defendsPoorlyAgainst("fire")).toBe(true);
    expect(planty.defendsPoorlyAgainst("water")).toBe(false);
    expect(fireBoy.defendsPoorlyAgainst("fire")).toBe(false);

    expect(wetMan.defendsWellAgainst("fire")).toBe(true);
    expect(planty.defendsWellAgainst("water")).toBe(true);
    expect(wetMan.defendsWellAgainst("water")).toBe(true);
  });
});

describe("testing for implementation of species of pokemons", () => {
  test("Charmander returns an instance of fire class and pokemon class, also has own move", () => {
    const charmander = new Charmander("Charlizard");
    expect(charmander).toBeInstanceOf(Fire);
    expect(charmander).toBeInstanceOf(Pokemon);
    expect(charmander.moves).toEqual({
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      Ember: {
        name: "ember",
        type: "fire",
        strength: "basic",
      },
      Flamethrower: {
        name: "flamethrower",
        type: "fire",
        strength: "power",
        statusEffect: {
          name: "burnt",
          effectChance: 95,
          turnsRemaining: 1,
          damage: 3,
        },
      },
    });
  });
  test('Squirtle returns an instance of the water class and pokemon class, also has own move', () => {
      const squirtle = new Squirtle("Crush");
      expect(squirtle).toBeInstanceOf(Water);
      expect(squirtle).toBeInstanceOf(Pokemon);
      expect(squirtle.moves).toEqual({
        Tackle: {
          name: "tackle",
          type: "normal",
          strength: "basic",
        },
        "Water Gun": {
          name: "water gun",
          type: "water",
          strength: "basic",
        },
        "Hydro pump": {
          name: "hydro pump",
          type: "water",
          strength: "power",
        },
      });
  });
  test("Bulbasaur returns an instance of the grass class and pokemon class, also has own move", () => {
    const bulbasaur = new Bulbasaur("Crush");
    expect(bulbasaur).toBeInstanceOf(Grass);
    expect(bulbasaur).toBeInstanceOf(Pokemon);
    expect(bulbasaur.moves).toEqual({
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      "Vine Whip": {
        name: "vine whip",
        type: "grass",
        strength: "basic",
      },
      "Trunk Hammer": {
        name: "trunk hammer",
        type: "grass",
        strength: "power",
      },
      "Poison Powder": {
        name: "poison powder",
        type: "poison",
        strength: "basic",
        statusEffect: {
          name: "poisoned",
          effectChance: 90,
          turnsRemaining: 3,
          damage: 1,
        },
      },
    });
  });
  test("Rattata returns an instance of the pokemon class, also has own move", () => {
    const rattata = new Rattata("Stewart Little");
    expect(rattata).toBeInstanceOf(Rattata);
    expect(rattata).toBeInstanceOf(Pokemon);
    expect(rattata.moves).toEqual({
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      "Round-House Kick": {
        name: "round-house kick",
        type: "normal",
        strength: "power",
      },
    });
  });
});