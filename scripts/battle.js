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
        player.catch(playerPokemon);

        const newPokemon = await inquirer.prompt([
          {
            type: "list",
            name: "name",
            message: "Which pokemon do you choose to send out instead?",
            choices: playerChoices,
          },
        ]);
        playerPokemon = player.getPokemon(newPokemon.name);
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
  }
  if (playerPokemon.hasFainted()) {
    console.log(`\nYou Lost!\n`);
  }
  if (enemyPokemon.hasFainted()) {
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
  if (defender.hitPoints < 20 && defender.hitPoints > 10) {
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

module.exports = { instantiateBattle, takeTurn };
