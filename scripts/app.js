const { Trainer } = require("../scripts/trainer");
const { Pokemon, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata, Flareon, Vaporeon, Leafeon } = require("../scripts/monsters");
const { Pokeball } = require("./pokeball");
const { catchPokemon } = require("./catch");

const testTrainer = new Trainer("Keith", Pokeball);
const testEnemy = new Trainer("Bob", Pokeball);

//testEnemy.catch(new Charmander("Fireman"));
testEnemy.catch(new Leafeon("Planty"));
//testEnemy.catch(new Rattata("Joey's Rattata"));
console.clear();

begin = async () => {
    await catchPokemon(testTrainer);
    testTrainer.fight(testEnemy);
}

begin();