const inquirer = require("inquirer");

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
    const viableMoves = [];
    availableMoves.forEach((inspectedMove) => {
      if (defender.defendsPoorlyAgainst(attacker.moves[inspectedMove].type)) {
        viableMoves.push(move);
      }
    });
    console.log(viableMoves, "<-- first pass");
    if (viableMoves.length === 0) {
      availableMoves.forEach((inspectedMove) => {
        if (!defender.defendsWellAgainst(attacker.moves[inspectedMove].type)) {
          viableMoves.push(inspectedMove);
        }
      });
    }
    console.log(viableMoves, "<-- second pass");
    if (viableMoves.length === 0) {
      selectedMove =
        attacker.moves[
          availableMoves[Math.floor(Math.random() * availableMoves.length)]
        ];
    } else {
      selectedMove =
        attacker.moves[
          viableMoves[Math.floor(Math.random() * viableMoves.length)]
        ];
    }
  }

  defender.takeDamage(attacker.useMove(selectedMove, attacker, defender));
  if (defender.hitPoints < 0) defender.hitPoints = 0;

  console.log(`\n${defender.name} has ${defender.hitPoints}HP remaining\n`);
  if (defender.hitPoints < 20 && defender.hitPoints >= 10) {
    console.log(`...and looks quite tired.\n`);
  }
  if (defender.hitPoints < 10 && defender.hitPoints > 0) {
    console.log(`...and looks badly wounded.\n`);
  }
  if (defender.hitPoints === 0) {
    console.log(`...and has fainted\n`);
  }
  return !playerTurn;
}

module.exports = takeTurn;
