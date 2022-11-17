const inquirer = require("inquirer");

async function substitutePokemon(trainer, faintedPokemon) {
  const playerChoices = [];
  trainer.belt.forEach(({ storage }) => {
    if (storage) {
      if (storage.hitPoints > 0) {
        playerChoices.unshift(storage);
      }
    }
  });
  console.log(`\nYou throw a pokeball towards your fainted pokemon...\n`);
  trainer.catch(faintedPokemon);
  if (playerChoices.length === 0)
    console.log("\nAll your pokemon have fainted\n");
  else {
    const substitue = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `${faintedPokemon.name} is no longer fit to fight. Which pokemon would you like to pick to take their place?`,
        choices: playerChoices,
      },
    ]);
    console.clear();
    return trainer.getPokemon(substitue.choice);
  }
  return null;
}

module.exports = substitutePokemon;
