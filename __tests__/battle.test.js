const { Trainer } = require("../scripts/trainer");
const { Pokeball } = require("../scripts/pokeball");
const { Pokemon, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata } = require("../scripts/monsters");
const { instantiateBattle } = require("../scripts/battle")

describe('battle function', () => {
    describe('fight -> instantiateBattle', () => {
        test('Returns the chosen pokemon from the belt of the trainer on which the function was called', () => {
          const testTrainer = new Trainer("Keith");
          const testEnemy = new Trainer("Bob");
          const squirtle = new Squirtle('Squirtle')
          const charmander = new Charmander('Charmander')
          const consoleSpy = jest.spyOn(console, 'log')

          testTrainer.catch(squirtle)
          testEnemy.catch(charmander)
          testTrainer.fight(testEnemy)
          //Assume user inputs correctly
          expect(consoleSpy).toBe("GO SQUIRTLE!!\nGO CHARMANDER!!")
        })
    })
})