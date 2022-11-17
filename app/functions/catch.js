const chalk = require("chalk");
const inquirer = require("inquirer");
const {
  Rattata,
  Squirtle,
  Charmander,
  Bulbasaur,
  Pikachu,
  Geodude,
  Pidgey,
} = require("../classes/monsters/monsters");

async function catchPokemon(trainer) {
  let numberOfPokemon = 0;

  await inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message:
          "How many Pokemon do you want to catch? (Your opponent has 3 Pokemons)",
        choices: [2, 3, 4],
      },
    ])
    .then((userInput) => {
      console.clear();
      numberOfPokemon = userInput.choice;
    })
    .catch((error) => {
      console.log(error);
    });

  for (let i = 0; i < numberOfPokemon; i++) {
    let species = "";

    await inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What species of Pokemon would you like to catch?",
          choices: [
            `Catch a Rattata  ${chalk.gray("[NORMAL]")}`,
            `Catch a Squirtle ${chalk.blueBright("[WATER]")}`,
            `Catch a Charmander ${chalk.redBright("[FIRE]")}`,
            `Catch a Bulbasaur ${chalk.greenBright("[GRASS]")}`,
            `Catch a Pikachu ${chalk.cyanBright("[ELECTRIC]")}`,
            `Catch a Geodude ${chalk.yellow("[GROUND]")}`,
            `Catch a Pidgey ${chalk.magentaBright("[FLYING]")}`,
          ],
        },
      ])
      .then((userInput) => {
        console.clear();
        species = userInput.choice.split(" ")[2];
      });

    await inquirer
      .prompt([
        {
          type: "input",
          name: "input",
          choices: "default",
          default: "Choose a nickname for your Pokemon",
        },
      ])
      .then(({ input }) => {
        console.clear();
        switch (species) {
          case "Rattata":
            trainer.catch(new Rattata(input));
            break;
          case "Squirtle":
            trainer.catch(new Squirtle(input));
            break;
          case "Pikachu":
            trainer.catch(new Pikachu(input));
            break;
          case "Charmander":
            trainer.catch(new Charmander(input));
            break;
          case "Bulbasaur":
            trainer.catch(new Bulbasaur(input));
            break;
          case "Geodude":
            trainer.catch(new Geodude(input));
            break;
          case "Pidgey":
            trainer.catch(new Pidgey(input));
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = catchPokemon;
