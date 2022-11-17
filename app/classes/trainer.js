const inquirer = require("inquirer");
const Pokeball = require("./pokeball")
const battleScript = require("../battleScript");

class Trainer {
    constructor(name) {
        this.name = name
        this.belt = [new Pokeball, new Pokeball, new Pokeball, new Pokeball, new Pokeball, new Pokeball]
    }
    catch(target) {
        for (let i = 0; i < this.belt.length; i++) {
            const pokeball = this.belt[i]
            if (pokeball.isEmpty()) {
                pokeball.throw(target)
                return
            }
        }
        console.log("You don't have any empty pokeballs left!");
    }
    getPokemon(name) {
        for (let i = 0; i < this.belt.length; i++) {
            const pokeball = this.belt[i]
            if (pokeball.storage !== null) {
                if (pokeball.storage.name === name) {
                    return pokeball.throw();
                }
            }
        }
        console.log("You don't have a pokemon by that name")
        return "You don't have a pokemon by that name"
    }
    fight(enemyPlayer) {
        const playerChoices = [];
        const enemyChoices = [];
        for (let i = 0; i < this.belt.length; i++) {
          const inspectedPokeball = this.belt[i];
          if (inspectedPokeball.storage !== null) {
            playerChoices.push(inspectedPokeball.storage);
          }
        }
        for (let i = 0; i < enemyPlayer.belt.length; i++) {
          const inspectedPokeball = enemyPlayer.belt[i];
          if (inspectedPokeball.storage !== null)
            enemyChoices.push(inspectedPokeball.storage);
        }

        inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Which pokemon do you choose to send out?",
              choices: playerChoices,
            },
          ])
          .then((playerPokemons) => {
            console.clear();
            const randomisedEnemy =
              enemyChoices[Math.floor(Math.random() * enemyChoices.length)];
            battleScript(
              this,
              this.getPokemon(playerPokemons.name),
              enemyPlayer,
              randomisedEnemy
            );
          })
          .catch((error) => {
              console.log(error);
          });
    }
}

module.exports = Trainer