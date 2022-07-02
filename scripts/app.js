const { Trainer } = require("../scripts/trainer");
const inquirer = require("inquirer");
const {
  Pokemon,
  Fire,
  Water,
  Grass,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Flareon,
  Vaporeon,
  Leafeon,
} = require("../scripts/monsters");
const { Pokeball } = require("./pokeball");
const { catchPokemon } = require("./catch");

const testTrainer = new Trainer("Keith", Pokeball);
const testEnemy = new Trainer("Bob", Pokeball);

testEnemy.catch(new Charmander("Charlizard"));
testEnemy.catch(new Bulbasaur("Planty"));
testEnemy.catch(new Squirtle("Squirty"));
// testEnemy.catch(new Rattata("Joey's Rattata"));
console.clear();

begin = async () => {
  await catchPokemon(testTrainer);

  await inquirer
    .prompt([
      {
        type: "list",
        name: "ready",
        message: "Are you ready to take on your opponent?",
        choices: ["Let's do it!"],
      },
    ])
    .then((answer) => {
      console.log(
        `You and your opponent step up ready to battle your pokemon, your hand rests over your belt of pokeballs...`
      );
    })
    .catch((error) => {
      console.log(error);
    });

  testTrainer.fight(testEnemy);
};

begin();
