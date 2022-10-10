const inquirer = require("inquirer");
const {
  Rattata,
  Squirtle,
  Charmander,
  Bulbasaur,
  Pikachu,
  Geodude,
  Pidgey,
} = require("../monsters");

async function catchPokemon(trainer) {
  let numberOfPokemon = 0;

  await inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "How many Pokemon do you want to catch? (Your opponent has 3 Pokemons)",
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
            "Catch a Rattata - normal type",
            "Catch a Squirtle - water type",
            "Catch a Charmander - fire type",
            "Catch a Bulbasaur - grass type",
            "Catch a Pikachu - electric type",
            "Catch a Geodude - ground type",
            "Catch a Pidgey - flying type",
          ],
        },
      ])
      .then((userInput) => {
        console.clear();
        species = userInput.choice;
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
      .then(({input}) => {
        console.clear();
        switch (species) {
          case "Catch a Rattata - normal type":
            trainer.catch(new Rattata(input));
            break;
          case "Catch a Squirtle - water type":
            trainer.catch(new Squirtle(input));
            break;
          case "Catch a Pikachu - electric type":
            trainer.catch(new Pikachu(input));
            break;
          case "Catch a Charmander - fire type":
            trainer.catch(new Charmander(input));
            break;
          case "Catch a Bulbasaur - grass type":
            trainer.catch(new Bulbasaur(input));
            break;
          case "Catch a Geodude - ground type":
            trainer.catch(new Geodude(input));
            break;
          case "Catch a Pidgey - flying type":
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
