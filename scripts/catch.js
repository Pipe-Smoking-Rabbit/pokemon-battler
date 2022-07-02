const inquirer = require("inquirer");
const {
  Rattata,
  Squirtle,
  Charmander,
  Bulbasaur,
  Flareon,
  Leafeon,
  Vaporeon,
  Pikachu,
} = require("./monsters");

async function catchPokemon(trainer) {
  let numberOfPokemon = 0;

  await inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "How many Pokemon do you want to catch?",
        choices: [1, 2, 3, 4, 5, 6],
      },
    ])
    .then((userInput) => {
      numberOfPokemon = userInput.choice;
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("uh oh");
      } else {
        console.log("uh oh again");
      }
    });

  for (let i = 0; i < numberOfPokemon; i++) {
    let species = "";

    await inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Which Pokemon would you like to catch?",
          choices: [
            "Rattata",
            "Squirtle",
            "Charmander",
            "Bulbasaur",
            "Pikachu",
            // "Flareon",
            // "Vaporeon",
            // "Leafeon",
          ],
        },
      ])
      .then((userInput) => {
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
      .then((inputName) => {
        nickname = inputName.input;
        switch (species) {
          case "Rattata":
            trainer.catch(new Rattata(nickname));
            break;
          case "Squirtle":
            trainer.catch(new Squirtle(nickname));
            break;
          case "Pikachu":
            trainer.catch(new Pikachu(nickname));
            break;
          case "Charmander":
            trainer.catch(new Charmander(nickname));
            break;
          case "Bulbasaur":
            trainer.catch(new Bulbasaur(nickname));
            break;
          case "Flareon":
            trainer.catch(new Flareon(nickname));
            break;
          case "Leafeon":
            trainer.catch(new Leafeon(nickname));
            break;
          case "Vaporeon":
            trainer.catch(new Vaporeon(nickname));
            break;
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("uh oh");
        } else {
          console.log("uh oh again");
        }
      });
  }
}

module.exports = { catchPokemon };
