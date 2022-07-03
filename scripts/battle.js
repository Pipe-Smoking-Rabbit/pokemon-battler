const inquirer = require("inquirer");
const { test } = require("picomatch");

async function instantiateBattle(player, enemyPlayer) {
  const playerChoices = [];
  const enemyChoices = [];
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
        name: "name",
        message: "Which pokemon do you choose to send out?",
        choices: playerChoices,
      },
    ])
    .then((playerPokemons) => {
      randomisedEnemy =
        enemyChoices[Math.floor(Math.random() * enemyChoices.length)];
      beginBattle(
        player,
        player.getPokemon(playerPokemons.name),
        enemyPlayer,
        randomisedEnemy
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("uh oh");
      } else {
        console.log("uh oh again");
      }
    });
}

async function beginBattle(
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
    `Your opponent sent out ${enemyPokemon.name.toUpperCase()}! A ${
      enemyPokemon.type
    } type pokemon...`
  );

  while (fightEnded === false && hasEscaped === false) {
    if (playerTurn) {
      const playerMove = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "What do you want to do?",
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
        if (playerChoices.length > 0) player.catch(playerPokemon);
        else {
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
            `\nYou give up searching your pokeball belt and realise that ${enemyPokemon.name} is about to attack\n`
          );
          playerPokemon = playerPokemon;
        } else playerPokemon = player.getPokemon(newPokemon.name);
      } else if (playerMove.choice === "Run") {
        console.log("You got away safely.");
        hasEscaped = true;
      }
    } else {
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
        console.log("All of your opponents pokemon have fainted");
        enemyPokemon = null;
        fightEnded = true;
      } else {
        console.log(`\nYour opponent throws a pokeball, catching ${enemyPokemon.name}, before quickly throwing out another pokemon:`)
        enemyPokemon =
          enemyChoices[Math.floor(Math.random() * enemyChoices.length)];
        console.log(`\n${enemyPokemon.name} (a ${enemyPokemon.type} type) springs forth and prepares to attack!`)
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

async function takeTurn(attacker, defender, playerTurn) {
  console.clear();
  const availableMoves = Object.keys(attacker.moves);

  let selectedMove;
  if (playerTurn) {
    const desiredMove = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `What move would you like to tell ${attacker.name} to use?`,
        choices: availableMoves,
      },
    ]);
    selectedMove = attacker.moves[desiredMove.choice];
  } else {
    let count = 100;
    let bestMove = 0;
    while (count > 0) {
      const randomMove = Math.floor(Math.random() * availableMoves.length);
      let testMove = attacker.moves[availableMoves[randomMove]];
      if (attacker.useMove(testMove, attacker, defender) > bestMove) {
        selectedMove = testMove;
        bestMove = attacker.useMove(testMove, attacker, defender);
        console.clear();
      }
      count--;
      console.clear();
    }
    console.clear();
  }

  defender.takeDamage(attacker.useMove(selectedMove, attacker, defender));
  if (defender.hitPoints < 0) defender.hitPoints = 0;

  console.log(`\n${defender.name} has ${defender.hitPoints}HP remaining`);
  if (defender.hitPoints < 20 && defender.hitPoints >= 10) {
    console.log(`...and looks tired.`);
  }
  if (defender.hitPoints < 10 && defender.hitPoints > 0) {
    console.log(`...and looks badly wounded.`);
  }
  if (defender.hitPoints === 0) {
    console.log(`...and has fainted`);
  }
  return !playerTurn;
}

async function substitutePokemon(trainer, faintedPokemon) {
  const playerChoices = [];
  trainer.belt.forEach(({ storage }) => {
    if (storage) {
      if (storage.hitPoints > 0) {
        playerChoices.unshift(storage);
      }
    }
  });
  trainer.catch(faintedPokemon);
  if (playerChoices.length === 0) console.log("All your pokemon have fainted");
  else {
    const substitue = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `\n${faintedPokemon.name} is no longer fit to fight. Which pokemon would you like to pick to take their place?`,
        choices: playerChoices,
      },
    ]);
    return trainer.getPokemon(substitue.choice);
  }
  return null;
}

module.exports = { instantiateBattle, takeTurn };

