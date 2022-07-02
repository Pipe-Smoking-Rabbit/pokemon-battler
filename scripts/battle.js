const inquirer = require("inquirer");
const { test } = require("picomatch");

async function instantiateBattle(player, enemyPlayer) {
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
        message: "Which pokemon do you choose to send out?",
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
  console.log(
    `Your opponent sent out ${enemyPokemon.name.toUpperCase()}! A ${
      enemyPokemon.type
    } type pokemon...`
  );

  while (
    !playerPokemon.hasFainted() &&
    !enemyPokemon.hasFainted() &&
    hasEscaped === false
  ) {
    if (playerTurn) {
      const userInput = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "What do you want to do?",
          choices: [`Attack`, "Run"],
        },
      ]);

      if (userInput.choice === `Attack`) {
        playerTurn = await takeTurn(playerPokemon, enemyPokemon, playerTurn);
      }
      if (userInput.choice === `Swap out ${playerPokemon.name}`) {
      } else if (userInput.choice === "Run") {
        console.log("You got away safely.");
        hasEscaped = true;
      }
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
    console.log(`You Lost!`);
  }
  if (enemyPokemon.hasFainted()) {
    console.log(`You Won!`);
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

  console.log(`${defender.name} has ${defender.hitPoints}HP remaining`);
  if (defender.hitPoints < 15 && defender.hitPoints > 0) {
    console.log(`and is looking very tired.`);
  }
  if (defender.hitPoints === 0) {
    console.log(`and has fainted...`);
  }
  return !playerTurn;
}

module.exports = { instantiateBattle, takeTurn };
