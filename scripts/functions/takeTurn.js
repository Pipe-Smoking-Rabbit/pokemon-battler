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
    const defenderBeforeTesting = {...defender};
    let count = 100;
    let bestMove = 0;
    while (count > 0) {
      const randomMove =
        attacker.moves[
          availableMoves[Math.floor(Math.random() * availableMoves.length)]
        ];
      const testMove = attacker.useMove(randomMove, attacker, defender);
      if (testMove > bestMove) {
        selectedMove = randomMove;
        bestMove = testMove;
      }
      count--;
    } 
    defender.status = defenderBeforeTesting.status
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
