const Trainer = require("./classes/trainer");
const inquirer = require("inquirer");
const getUniqueIndex = require("./functions/get-unique-index")
const {
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Pidgey,
  Pikachu,
  Geodude,
} = require("./classes/monsters/monsters");
const catchPokemon = require("./functions/catch");

const playerTrainer = new Trainer("Keith");
const computerTrainer = new Trainer("Bob");

const allEnemyPokemon = [
  new Charmander("Charmander"),
  new Bulbasaur("Bulbasaur"),
  new Pidgey("Pidgey"),
  new Squirtle("Squirtle"),
  new Rattata("Rattata"),
  new Pikachu("Pikachu"),
  new Geodude("Geodude"),
];



const firstIndex = getUniqueIndex();
const secondIndex = getUniqueIndex(firstIndex);
const thirdIndex = getUniqueIndex(firstIndex, secondIndex);

computerTrainer.catch(allEnemyPokemon[firstIndex]);
computerTrainer.catch(allEnemyPokemon[secondIndex]);
computerTrainer.catch(allEnemyPokemon[thirdIndex]);
console.clear();

begin = async () => {
  await catchPokemon(playerTrainer);

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
      console.clear();
      console.log(
        `\nYou and your opponent step up ready to battle your pokemon, your hand rests over your belt of pokeballs...\n`
      );
    })
    .catch((error) => {
      console.log(error);
    });

  playerTrainer.fight(computerTrainer);
};

begin();
