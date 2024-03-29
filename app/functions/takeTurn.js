const inquirer = require("inquirer");
const chalk = require("chalk");
const { typeColour } = require("../lookup-tables/type-colour");

async function takeTurn(attacker, defender, playerTurn) {
  console.clear();
  const attackerMoves = attacker.moves;

  let selectedMove;
  if (playerTurn) {
    const humanMoves = Object.keys(attackerMoves).map((move) => {
      const thisMove = attackerMoves[move]
      const moveType = thisMove.type;
      const colour = typeColour[moveType];
      const accuracy =
        100 - attacker.calculateMoveMissChance(thisMove);
      const damage = attacker.calculateMoveBaseDamage(thisMove)
      return {
        name: `${move} ${colour(`[${moveType.toUpperCase()}]`)}  ${colour(
          `[${damage.toFixed(0)} DMG]`
        )} ${colour(`[${accuracy.toFixed(0)}% ACC]`)}`,
        value: move,
      };
    });

    const desiredMove = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `What move would you like to tell ${attacker.name} to use?`,
        choices: humanMoves,
      },
    ]);
    selectedMove = attackerMoves[desiredMove.choice];
  } else {
    // ******* COMPUTER MOVE LOGIC ********
    const computerMoves = Object.keys(attackerMoves);
    const viableMoves = [];
    computerMoves.forEach((inspectedMove) => {
      if (defender.defendsPoorlyAgainst(attackerMoves[inspectedMove].type)) {
        viableMoves.push(inspectedMove);
      }
    });
    if (viableMoves.length === 0) {
      computerMoves.forEach((inspectedMove) => {
        if (
          !defender.defendsWellAgainst(attackerMoves[inspectedMove].type) &&
          attackerMoves[inspectedMove].type === attacker.type
        ) {
          viableMoves.push(inspectedMove);
        }
      });
    }
    if (viableMoves.length === 0) {
      computerMoves.forEach((inspectedMove) => {
        if (!defender.defendsWellAgainst(attackerMoves[inspectedMove].type)) {
          viableMoves.push(inspectedMove);
        }
      });
    }
    if (viableMoves.length === 0) {
      selectedMove =
        attackerMoves[
          computerMoves[Math.floor(Math.random() * computerMoves.length)]
        ];
    } else {
      selectedMove =
        attackerMoves[
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
