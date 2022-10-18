const inquirer = require("inquirer");
const chalk = require("chalk");

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
    // ******* COMPUTER MOVE LOGIC ********
    const viableMoves = [];
    availableMoves.forEach((inspectedMove) => {
      if (defender.defendsPoorlyAgainst(attacker.moves[inspectedMove].type)) {
        viableMoves.push(inspectedMove);
      }
    });
    if (viableMoves.length === 0) {
      availableMoves.forEach((inspectedMove) => {
        if (
          !defender.defendsWellAgainst(attacker.moves[inspectedMove].type) &&
          attacker.moves[inspectedMove].type === attacker.type
        ) {
          viableMoves.push(inspectedMove);
        }
      });
    }
    if (viableMoves.length === 0) {
      availableMoves.forEach((inspectedMove) => {
        if (!defender.defendsWellAgainst(attacker.moves[inspectedMove].type)) {
          viableMoves.push(inspectedMove);
        }
      });
    }
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

  defender.takeDamage(attacker.useMove(selectedMove, defender));
  if (defender.hitPoints < 0) defender.hitPoints = 0;

  console.log(
    chalk.red(
      `\n${defender.name} HEALTH: ${Math.ceil(
        (defender.hitPoints / defender.maxHP) * 100
      )}%\n`.toUpperCase()
    )
  );
  if (defender.hitPoints === 0) {
    console.log(`...and has fainted\n`);
  }
  return !playerTurn;
}

module.exports = takeTurn;
