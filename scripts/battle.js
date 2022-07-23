const inquirer = require("inquirer");
const substitutePokemon = require("./functions/substitutePokemon")
const takeTurn = require("./functions/takeTurn")

async function battleScript(
  player,
  startingPlayerPokemon,
  enemyPlayer,
  enemyPokemon
) {
  let playerPokemon = startingPlayerPokemon;
  let playerTurn = true;
  let hasEscaped = false;
  let fightEnded = false;
  console.log(
    `\nYour opponent sent out ${enemyPokemon.name.toUpperCase()}! A ${
      enemyPokemon.type
    } type pokemon...\n`
  );

  while (fightEnded === false && hasEscaped === false) {
    if (playerTurn) {
      await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: `It's your turn, get ready!`,
          choices: ["Ok!"],
        },
      ]);
      console.clear();
      if (enemyPokemon.status) {
        if (enemyPokemon.status.turnsRemaining) {
          enemyPokemon.takeDamage(enemyPokemon.status.damage);
          console.log(
            `\n${enemyPokemon.name} took ${enemyPokemon.status.damage} damage because they are ${enemyPokemon.status.name}\n`
          );
          enemyPokemon.status.turnsRemaining--;
        } else enemyPokemon.status = {};
      }
      const playerMove = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: `What do you want to tell ${playerPokemon.name} to do?`,
          choices: [`Attack`, `Change Pokemon`, "Run"],
        },
      ]);

      if (playerMove.choice === `Attack`) {
        playerTurn = await takeTurn(playerPokemon, enemyPokemon, playerTurn);
      }
      if (playerMove.choice === `Change Pokemon`) {
        playerTurn = false;
        const playerChoices = [];
        player.belt.forEach(({ storage }) => {
          if (storage) {
            if (storage.hitPoints > 0) {
              playerChoices.push(storage);
            }
          }
        });
        if (playerChoices.length > 0) {
          console.clear();
          player.catch(playerPokemon);
        } else {
          playerChoices.push("You don't have any other pokemon!");
        }

        const newPokemon = await inquirer.prompt([
          {
            type: "list",
            name: "name",
            message: "Which pokemon do you choose to send out instead?",
            choices: playerChoices,
          },
        ]);
        if (newPokemon.name === "You don't have any other pokemon!") {
          console.clear();
          console.log(
            `\nYou give up searching your pokeball belt and realise that ${enemyPokemon.name} is about to attack ${playerPokemon.name}\n`
          );
        } else {
          console.clear();
          playerPokemon = player.getPokemon(newPokemon.name);
        }
      } else if (playerMove.choice === "Run") {
        console.log("You got away safely.");
        hasEscaped = true;
      }
    } else {
      if (playerPokemon.status) {
        if (playerPokemon.status.turnsRemaining) {
          playerPokemon.takeDamage(playerPokemon.status.damage);
          console.log(
            `\n${playerPokemon.name} took ${playerPokemon.status.damage} damage because they are ${playerPokemon.status.name}\n`
          );
          playerPokemon.status.turnsRemaining--;
        } else playerPokemon.status = {};
      }
      await inquirer
        .prompt([
          {
            type: "list",
            name: "choice",
            message: `It's the enemy's turn. They shout their command to ${enemyPokemon.name}`,
            choices: [`"Brace yourself ${playerPokemon.name}"`],
          },
        ])
        .then(() => {
          playerTurn = takeTurn(enemyPokemon, playerPokemon, playerTurn);
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log("uh oh");
          } else {
            console.log("uh oh again");
          }
        });
    }
    if (playerPokemon.hasFainted()) {
      playerPokemon = await substitutePokemon(player, playerPokemon);
      if (playerPokemon === null) {
        fightEnded = true;
      }
    }
    if (enemyPokemon.hasFainted()) {
      const enemyChoices = [];
      enemyPlayer.belt.forEach(({ storage }) => {
        if (storage) {
          if (storage.hitPoints > 0) enemyChoices.push(storage);
        }
      });
      if (enemyChoices.length === 0) {
        console.log(
          `Your opponent bows their head glumly, with no other pokemon left in their pokebelt.`
        );
        enemyPokemon = null;
        fightEnded = true;
      } else {
        console.log(
          `\nYour opponent throws a pokeball, catching ${enemyPokemon.name}`
        );
        enemyPokemon =
          enemyChoices[Math.floor(Math.random() * enemyChoices.length)];
        console.log(
          `followed by another pokeball, which sails through the air and bursts open, ${enemyPokemon.name} (a ${enemyPokemon.type} type) springs forth and prepares to attack ${playerPokemon.name}!\n`
        );
      }
    }
  }
  if (playerPokemon === null) {
    console.log(`\nYou Lost!\n`);
  }
  if (enemyPokemon === null) {
    console.log(`\nYou Won!\n`);
  }
}

module.exports = battleScript;
