const inquirer = require("inquirer");

function instantiateBattle(player, enemyPlayer) {
  playerChoices = [];
  enemyChoices = [];
  for (let i = 0; i < player.belt.length; i++) {
    const inspectedPokeball = player.belt[i];
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
        name: "pokemon",
        message: "Which pokemon do you choose?",
        choices: playerChoices,
      },
    ])
    .then((selectedPokemon) => {
      randomisedEnemy =
        enemyChoices[Math.floor(Math.random() * enemyChoices.length)];
      beginBattle(player.getPokemon(selectedPokemon.pokemon), randomisedEnemy);
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("uh oh");
      } else {
        console.log("uh oh again");
      }
    });
}

async function beginBattle(playerPokemon, enemyPokemon) {
  let playerTurn = true;
  let hasEscaped = false;
  console.log(`Your opponent sent out ${enemyPokemon.name.toUpperCase()}!`);

   while (!playerPokemon.hasFainted() && !enemyPokemon.hasFainted() && hasEscaped === false) {
    if (playerTurn) {
        await inquirer
            .prompt([
            {
                type: "list",
                name: "choice",
                message: "What do you want to do?",
                choices: ["Attack", "Run"],
            },
            ])
            .then((userInput) => {
                if (userInput.choice === "Attack") {
                playerTurn = takeTurn(playerPokemon, enemyPokemon, playerTurn);
                } else if (userInput.choice === "Run") {
                    console.log("You got away safely.");
                    hasEscaped = true;
                }
            })
            .catch((error) => {
            if (error.isTtyError) {
                console.log("uh oh");
            } else {
                console.log("uh oh again");
            }
            });
    } else {
        await inquirer
            .prompt([
            {
                type: "list",
                name: "choice",
                message: "It's the enemy's turn.",
                choices: ["OK"],
            },
            ])
            .then((userInput) => {
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
  }
  if (playerPokemon.hasFainted()) {
    console.log(`You Lost!`)
  } 
  if (enemyPokemon.hasFainted()) {
    console.log(`You Won!`)
  }
}

function takeTurn(attacker, defender, playerTurn) {
  if (defender.isWeakTo(attacker)) {
    defender.takeDamage(attacker.useMove() * 1.25);
  } else if (defender.isEffectiveAgainst(attacker)) {
    defender.takeDamage(attacker.useMove() * 0.75);
  } else {
    defender.takeDamage(attacker.useMove());
  }
  console.log(`${defender.name} has ${defender.hitPoints}HP remaining`)
  return !playerTurn;
}

module.exports = { instantiateBattle, takeTurn };
