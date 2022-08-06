const Trainer = require("../scripts/trainer");
const Pokeball = require("../scripts/pokeball");
const {
  Pokemon,
  Fire,
  Water,
  Grass,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
} = require("../scripts/monsters");

describe("Trainer", () => {
  test('Trainer contains a property "belt" which is an array of 6 unique Pokeballs', () => {
    const trainer = new Trainer("darren", Pokeball);
    expect(trainer.hasOwnProperty("belt")).toBe(true);
    expect(trainer.belt.length).toBe(6);
    for (let i = 0; i < 6; i++) {
      expect(trainer.belt[i]).toBeInstanceOf(Pokeball);
    }
    expect(trainer.belt[0]).not.toBe(
      trainer.belt[3],
      trainer.belt[1],
      trainer.belt[5]
    );
  });
  describe("methods", () => {
    describe("catch method", () => {
      test("catch method should call the throw method on the first empty pokeball in the belt to catch the pokemon passed to catch method as argument", () => {
        const trainer = new Trainer("darren", Pokeball);
        const bulbasaur = new Bulbasaur("chadignton bear");
        trainer.catch(bulbasaur);
        expect(trainer.belt[0].storage).toBe(bulbasaur);
      });
      test("catch method should not call throw on pokeballs which already contain pokemon in storage", () => {
        const trainer = new Trainer("darren", Pokeball);
        const bulbasaur = new Bulbasaur("chadignton bear");
        const charlizard = new Charmander("charlizard");
        const rattata = new Rattata("remi")
        trainer.catch(bulbasaur);
        trainer.catch(charlizard);
        trainer.catch(rattata);
        expect(trainer.belt[0].storage).toBe(bulbasaur);
        expect(trainer.belt[1].storage).toBe(charlizard);
        expect(trainer.belt[2].storage).toBe(rattata);
      });
      test('catch method returns a console log informing the user that due to bad life decisions they no longer have any empty pokeballs remaining with which to catch more pokemon', () => {
          const trainer = new Trainer("darren", Pokeball);
          const bulbasaur = new Bulbasaur("chadignton bear");
          const charlizard = new Charmander("charlizard");
          const consoleSpy = jest.spyOn(console, "log");
          trainer.catch(bulbasaur);
          trainer.catch(bulbasaur);
          trainer.catch(bulbasaur);
          trainer.catch(bulbasaur);
          trainer.catch(bulbasaur);
          trainer.catch(bulbasaur);
          trainer.catch(charlizard);
          for (let i = 0; i < trainer.belt.length; i++) {
              expect(trainer.belt[i].storage).not.toBe(charlizard);
          }
          expect(consoleSpy).toHaveBeenCalledWith("You don't have any empty pokeballs left!");
          consoleSpy.mockRestore();
      });
    });
    describe('getPokemon method', () => {
      test('getPokemon returns the first pokemon in the trainers belt, if the name matches the passed argument', () => {
        const trainer = new Trainer("Guysie Bob", Pokeball);
        const lizarchar = new Charmander('Friendboy');
        trainer.catch(lizarchar);
        expect(trainer.getPokemon("Friendboy")).toBe(lizarchar)
      });
      test('getPokemon returns the first pokemon in the belt which has a name matching the passed argument', () => {
        const trainer = new Trainer("Guysie Bob", Pokeball);
        const wetty = new Squirtle('Squirty Turty');
        const lizarchar = new Charmander('Friendboy');
        trainer.catch(wetty);
        trainer.catch(wetty);
        trainer.catch(lizarchar);
        expect(trainer.getPokemon("Friendboy")).toBe(lizarchar)
      });
      test('getPokemon returns "You don\'t have a pokemon by that name"', () => {
        const trainer = new Trainer("Guysie Bob", Pokeball);
        const wetty = new Squirtle('Squirty Turty');
        const lizarchar = new Charmander('Friendboy');
        trainer.catch(wetty);
        trainer.catch(lizarchar);
        expect(trainer.getPokemon("Wetman")).toBe("You don't have a pokemon by that name")
      })
    });
  });
});
