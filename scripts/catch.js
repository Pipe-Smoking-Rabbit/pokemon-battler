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
  Geodude,
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
          message: "What type of Pokemon would you like to catch?",
          choices: ["Normal", "Water", "Fire", "Grass", "Electric", "Ground"],
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
      .then((inputName) => {
        console.clear();
        nickname = inputName.input;
        switch (species) {
          case "Normal":
            trainer.catch(new Rattata(nickname));
            break;
          case "Water":
            trainer.catch(new Squirtle(nickname));
            break;
          case "Electric":
            trainer.catch(new Pikachu(nickname));
            break;
          case "Fire":
            trainer.catch(new Charmander(nickname));
            break;
          case "Grass":
            trainer.catch(new Bulbasaur(nickname));
            break;
          case "Ground":
            trainer.catch(new Geodude(nickname));
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
        console.log(error);
      });
  }
}

module.exports = { catchPokemon };
