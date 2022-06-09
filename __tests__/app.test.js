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
        expect(dansMon.hasFainted()).toBe(false)
        dansMon.takeDamage(100)
        expect(dansMon.hasFainted()).toBe(true)
    });
  });
});