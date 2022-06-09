const parent = require("../scripts/app");

describe("Pokemon Class", () => {
  test("Should return an instance of the Pokemon class", () => {
    const basicMon = new parent.Pokemon();
    expect(basicMon).toBeInstanceOf(parent.Pokemon);
  });
  test("Returned instance has the name property", () => {
    const mitchsMon = new parent.Pokemon("Ian");
    expect(mitchsMon.name).toBe("Ian");
  });
  test('Returned instance has the type property, defaulting to "normal"', () => {
    const mitchsMon = new parent.Pokemon("Ian");
    expect(mitchsMon.type).toBe("normal");
  });
  test("Returned instance has the hitPoints property", () => {
    const mitchsMon = new parent.Pokemon("Ian");
    expect(mitchsMon.hasOwnProperty("hitPoints")).toBe(true);
  });
  test("Returned instance has the attackDamage property", () => {
    const mitchsMon = new parent.Pokemon("Ian");
    expect(mitchsMon.hasOwnProperty("attackDamage")).toBe(true);
  });
  test('Returned instance has the move property, defaulting to "tackle"', () => {
    const mitchsMon = new parent.Pokemon("Ian");
    expect(mitchsMon.move).toBe("tackle");
  });
  describe("methods", () => {
    test('isEffectiveAgainst method returns a boolean if the pokemon is effective against their opponent, "normal" pokemon are not effective against anything', () => {
      const dansMon = new parent.Pokemon("Morapungo");
      const mitchsMon = new parent.Pokemon("Ian");
      expect(dansMon.isEffectiveAgainst(mitchsMon)).toBe(false);
      dansMon.type = "fire";
      mitchsMon.type = "grass";
      expect(dansMon.isEffectiveAgainst(mitchsMon)).toBe(true);
    });
    test("isWeakTo method returns boolean if the pokemon is weak to the opponents type, normal are not weak to anything", () => {
      const dansMon = new parent.Pokemon("Morapungo");
      const mitchsMon = new parent.Pokemon("Ian");
      expect(dansMon.isWeakTo(mitchsMon)).toBe(false);
      dansMon.type = "grass";
      mitchsMon.type = "fire";
      expect(dansMon.isWeakTo(mitchsMon)).toBe(true);
      dansMon.type = "grass";
      mitchsMon.type = "water";
      expect(dansMon.isWeakTo(mitchsMon)).toBe(false);
      dansMon.type = "water";
      mitchsMon.type = "grass";
      expect(dansMon.isWeakTo(mitchsMon)).toBe(true);
    });
    test("takeDamage method will reduce hitpoints by given number", () => {
      const dansMon = new parent.Pokemon("Morapungo");
      dansMon.takeDamage(20);
      expect(dansMon.hitPoints).toBe(80);
    });
    test("useMove method will return attack damage", () => {
      const dansMon = new parent.Pokemon("Morapungo");
      const consoleSpy = jest.spyOn(console, "log");
      expect(dansMon.useMove()).toBe(10);
      expect(consoleSpy).toHaveBeenCalledWith("Morapungo used tackle.");
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      consoleSpy.mockRestore();
    });
    test("hasFainted will return a boolean indicating when dead", () => {
      const dansMon = new parent.Pokemon("Morapungo");
      expect(dansMon.hasFainted()).toBe(false);
      dansMon.takeDamage(100);
      expect(dansMon.hasFainted()).toBe(true);
    });
  });
});

describe("Fire Class", () => {
  test("Returns an instance of both the Fire class and the Pokemon class", () => {
    const fireBoy = new parent.Fire("Bigshaq");
    expect(fireBoy).toBeInstanceOf(parent.Fire);
    expect(fireBoy).toBeInstanceOf(parent.Pokemon);
  });
  test("Returned instance has the type of fire", () => {
    const fireBoy = new parent.Fire("Bigshaq");
    expect(fireBoy.type).toBe("fire");
  });
});

describe("Water Class", () => {
  test("Returns an instance of both the Water class and the Pokemon class", () => {
    const wetMan = new parent.Water("Moist");
    expect(wetMan).toBeInstanceOf(parent.Water);
    expect(wetMan).toBeInstanceOf(parent.Pokemon);
  });
  test("Returned instance has the type of water", () => {
    const wetMan = new parent.Water("Moist");
    expect(wetMan.type).toBe("water");
  });
});

describe("Grass Class", () => {
  test("Returns an instance of both the Grass class and the Pokemon class", () => {
    const planty = new parent.Grass("Snoop Dogg");
    expect(planty).toBeInstanceOf(parent.Grass);
    expect(planty).toBeInstanceOf(parent.Pokemon);
  });
  test("Returned instance has the type of water", () => {
    const planty = new parent.Grass("Snoop Dogg");
    expect(planty.type).toBe("grass");
  });
});

describe("Types appropriately change isEffectiveAgainst and isWeakTo", () => {
  test("Returns true or false correctly based on type", () => {
    const planty = new parent.Grass("Snoop Dogg");
    const wetMan = new parent.Water("Moist");
    const fireBoy = new parent.Fire("Bigshaq");

    expect(planty.isWeakTo(fireBoy)).toBe(true);
    expect(planty.isWeakTo(wetMan)).toBe(false);
    expect(fireBoy.isWeakTo(fireBoy)).toBe(false);

    expect(wetMan.isEffectiveAgainst(fireBoy)).toBe(true);
    expect(planty.isEffectiveAgainst(wetMan)).toBe(true);
    expect(wetMan.isEffectiveAgainst(wetMan)).toBe(false);
  });
});

describe("testing for implementation of species of pokemons", () => {
  test("Charmander returns an instance of fire class and pokemon class, also has own move", () => {
    const charmander = new parent.Charmander("Charlizard");
    expect(charmander).toBeInstanceOf(parent.Charmander);
    expect(charmander).toBeInstanceOf(parent.Fire);
    expect(charmander).toBeInstanceOf(parent.Pokemon);
    expect(charmander.move).toBe("ember")
  });
  test('Squirtle returns an instance of the water class and pokemon class, also has own move', () => {
      const squirtle = new parent.Squirtle("Crush");
      expect(squirtle).toBeInstanceOf(parent.Squirtle);
      expect(squirtle).toBeInstanceOf(parent.Water);
      expect(squirtle).toBeInstanceOf(parent.Pokemon);
      expect(squirtle.move).toBe("water gun");
  });
  test("Bulbasaur returns an instance of the grass class and pokemon class, also has own move", () => {
    const bulbasaur = new parent.Bulbasaur("Crush");
    expect(bulbasaur).toBeInstanceOf(parent.Bulbasaur);
    expect(bulbasaur).toBeInstanceOf(parent.Grass);
    expect(bulbasaur).toBeInstanceOf(parent.Pokemon);
    expect(bulbasaur.move).toBe("vine whip");
  });
  test("Rattata returns an instance of the pokemon class, also has own move", () => {
    const rattata = new parent.Rattata("Stewart Little");
    expect(rattata).toBeInstanceOf(parent.Rattata);
    expect(rattata).toBeInstanceOf(parent.Pokemon);
    expect(rattata.move).toBe("round-house kick");
  });
});
