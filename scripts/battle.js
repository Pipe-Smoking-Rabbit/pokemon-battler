const inquirer = require("inquirer");
const { Trainer } = require("../scripts/trainer");
const { Pokeball } = require("../scripts/pokeball");
const {
  Pokemon,
  Fire,
  Water,
  Grass,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
} = require("../scripts/monsters");

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

function beginBattle(playerPokemon, enemyPokemon) {
  let playerTurn = true;
  console.log(`Your opponent sent out ${enemyPokemon.name.toUpperCase()}!`);

  while (!playerPokemon.hasFainted() && !enemyPokemon.hasFainted()) {
    if (playerTurn) {
      playerTurn = takeTurn(playerPokemon, enemyPokemon, playerTurn);
    } else {
      playerTurn = takeTurn(enemyPokemon, playerPokemon, playerTurn);
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
