const { Trainer } = require("../scripts/trainer");
const { Pokemon, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata } = require("../scripts/monsters");


const testTrainer = new Trainer("Keith");
const testEnemy = new Trainer("Bob");
const squirtle = new Squirtle('Vincent')
const charmander = new Charmander('Charmander')

testTrainer.catch(squirtle)
testEnemy.catch(charmander)
testTrainer.fight(testEnemy)