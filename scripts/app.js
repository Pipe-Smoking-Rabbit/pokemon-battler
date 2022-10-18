const Trainer = require("../scripts/trainer");
const inquirer = require("inquirer");
const {
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Pidgey,
  Pikachu,
  Geodude,
} = require("../scripts/monsters");
const catchPokemon = require("./functions/catch");

const testTrainer = new Trainer("Keith");
const testEnemy = new Trainer("Bob");

const allEnemyPokemon = [
  new Charmander("Charmander"),
  new Bulbasaur("Bulbasaur"),
  new Pidgey("Pidgey"),
  new Squirtle("Squirtle"),
  new Rattata("Rattata"),
  new Pikachu("Pikachu"),
  new Geodude("Geodude"),
];

function getUniqueIndex(num1, num2) {
  let randomNumber = Math.floor(Math.random() * allEnemyPokemon.length);
  while (randomNumber === num1 || randomNumber === num2) {
    randomNumber = Math.floor(Math.random() * allEnemyPokemon.length);
  }
  return randomNumber;
}

const firstIndex = getUniqueIndex();
const secondIndex = getUniqueIndex(firstIndex);
const thirdIndex = getUniqueIndex(firstIndex, secondIndex);

testEnemy.catch(allEnemyPokemon[firstIndex]);
testEnemy.catch(allEnemyPokemon[secondIndex]);
testEnemy.catch(allEnemyPokemon[thirdIndex]);
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
      console.clear();
      console.log(
        `\nYou and your opponent step up ready to battle your pokemon, your hand rests over your belt of pokeballs...\n`
      );
    })
    .catch((error) => {
      console.log(error);
    });

  testTrainer.fight(testEnemy);
};

begin();
