const { Trainer } = require("../scripts/trainer");
const { Pokeball } = require("../scripts/pokeball");
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
const { instantiateBattle, takeTurn } = require("../scripts/battle");

describe("battle function", () => {
  describe("fight -> instantiateBattle", () => {
    test("takeTurn reduces HP of defending pokemon by the attack damage of attacking pokemon, with damage multiplier applied if necessary", () => {
      const squirtle = new Squirtle("Squirtle");
      const charmander = new Charmander("Charmander");
      takeTurn(squirtle, charmander, true);
      expect(charmander.hitPoints).toBe(100 - 12.5);
      takeTurn(charmander, squirtle);
      expect(squirtle.hitPoints).toBe(100 - 7.5);
    });
    test("takeTurn return the opposite of the boolean passed as an argument", () => {
      const squirtle = new Squirtle("Squirtle");
      const charmander = new Charmander("Charmander");
      expect(takeTurn(squirtle, charmander, true)).toBe(false);
      expect(takeTurn(squirtle, charmander, false)).toBe(true);
    });
  });
});

const testTrainer = new Trainer("Keith");
const testEnemy = new Trainer("Bob");
