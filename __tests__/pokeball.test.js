const Pokeball = require("../app/classes/pokeball");
const {
  Pokemon,
  Fire,
  Water,
  Grass,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
} = require("../app/classes/monsters");

describe("Pokeball Class", () => {
  test("Returns an instance of the Pokeball class", () => {
    const pokeball = new Pokeball();
    expect(pokeball).toBeInstanceOf(Pokeball);
  });
  test("Pokeball has a storage property", () => {
    const pokeball = new Pokeball();
    expect(pokeball.hasOwnProperty("storage")).toBe(true);
  });
  describe("Pokeball Methods", () => {
    test("isEmpty method returns true if there is nothing stored, or false if something is", () => {
      const pokeball = new Pokeball();
      expect(pokeball.isEmpty()).toBe(true);
      const rattata = new Rattata("Stewart Little");
      pokeball.throw(rattata);
      expect(pokeball.isEmpty()).toBe(false);
    });
    test('contains method returns the name of the Pokemon that is stored, or returns "empty..."', () => {
      const pokeball = new Pokeball();
      expect(pokeball.contains()).toBe("Empty...");
      const rattata = new Rattata("Stewart Little");
      pokeball.throw(rattata);
      expect(pokeball.contains()).toBe(rattata.name);
    });
    describe("Throw Method", () => {
      test("If the ball is empty, and throw is called with a pokemon passed as the argument, that pokemon is captured in storage", () => {
        const pokeball = new Pokeball();
        const pokeman = new Squirtle("Wetman");
        const consoleSpy = jest.spyOn(console, "log");
        expect(pokeball.storage).toEqual(null);
        pokeball.throw(pokeman);
        expect(pokeball.storage).toBe(pokeman);

        expect(consoleSpy).toHaveBeenCalledWith(
          `\nYou caught ${pokeman.name}!\n`
        );
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        consoleSpy.mockRestore();
      });
      test("If the ball is not empty, and throw is called with a pokemon passed as the argument, that pokemon is NOT captured in storage", () => {
        const pokeball = new Pokeball();
        const pokeman = new Squirtle("Wetman");
        const newPokeman = new Charmander(
          "Hi there, my names.... charmander :3"
        );
        const consoleSpy = jest.spyOn(console, "log");
        pokeball.storage = pokeman;
        pokeball.throw(newPokeman);
        expect(pokeball.storage).toBe(pokeman);

        expect(consoleSpy).toHaveBeenCalledWith(
          `There was no room to capture ${newPokeman.name}.`
        );
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        consoleSpy.mockRestore();
      });
      test("If there is no target pokemon and the ball is not empty, returns the stored pokemon and console logs a battlecry", () => {
        const pokeball = new Pokeball();
        const newPokeman = new Charmander(
          "Hi there, my names.... charmander :3"
        );
        const consoleSpy = jest.spyOn(console, "log");
        pokeball.storage = newPokeman;
        expect(pokeball.throw()).toBe(newPokeman);

        expect(consoleSpy).toHaveBeenCalledWith(
          '\nYou throw your pokeball and Hi there, my names.... charmander :3, a fire type pokemon, bursts out ready to fight.\n"GO HI THERE, MY NAMES.... CHARMANDER :3!!"\n'
        );
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        consoleSpy.mockRestore();
      });
      test("If there is no target pokemon, and the ball is empty, informs the user via the console", () => {
        const pokeball = new Pokeball();
        const consoleSpy = jest.spyOn(console, "log");
        pokeball.throw();
        expect(consoleSpy).toHaveBeenCalledWith(
          `Sorry, that pokeball is empty.`
        );
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        consoleSpy.mockRestore();
      });
    });
  });
});
