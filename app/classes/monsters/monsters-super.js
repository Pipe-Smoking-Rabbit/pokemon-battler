const chalk = require("chalk");

class Pokemon {
  constructor(name) {
    this.name = name;
    this.type = "normal";
    this.hitPoints = 100;
    this.maxHP = 100;
    this.attackDamage = 10;
    this.moves = {
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
    };
    this.status = {};
  }

  defendsWellAgainst(type) {
    return false;
  }

  defendsPoorlyAgainst(type) {
    if (type === "fighting") return true;
    return false;
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
  }

  useMove(selectedMove, defender) {
    // console.clear();
    console.log(
      chalk.yellow(
        `\n"${this.name}, use ${selectedMove.name}!"\n`.toUpperCase()
      )
    );
    let baseDamage = this.attackDamage;
    let critDamage = 0;
    let powerMoveBonus = 0;
    let outgoingDamage = 0;

    const accuracy = Math.random() * 100;
    let missChance = 15;
    if (this.status.missChanceMultiplier) {
      missChance *= this.status.missChanceMultiplier;
      this.status.turnsRemaining--;
      if (!this.status.turnsRemaining) this.status = {};
    }
    if (
      (selectedMove.strength === "basic" && accuracy < missChance) ||
      (selectedMove.strength === "power" && accuracy < missChance * 2)
    ) {
      console.log(chalk.red(`\nMISS\n`));
      return 0;
    } else {
      if (this.type !== selectedMove.type) {
        baseDamage *= 0.75;
      }
      if (defender.defendsPoorlyAgainst(selectedMove.type)) {
        baseDamage *= 1.5;
        console.log(chalk.green(`\nEFFECTIVE TYPE (x1.5 DAMAGE)\n`));
      }
      if (defender.defendsWellAgainst(selectedMove.type)) {
        baseDamage *= 0.5;
        console.log(chalk.red(`\nINEFFECTIVE TYPE (HALF DAMAGE)\n`));
      }
      const critRoll = Math.random() * 100;
      if (critRoll > 90 + missChance / 100) {
        critDamage = baseDamage * 0.5;
      }
      if (selectedMove.strength === "power") {
        powerMoveBonus = baseDamage * 0.2;
      }
      outgoingDamage = Math.round(baseDamage + critDamage + powerMoveBonus);
      critDamage
        ? console.log(chalk.blue(`\nCRITICAL HIT! [${outgoingDamage} DAMAGE]`))
        : console.log(chalk.blue(`\nHIT! [${outgoingDamage} DAMAGE]\n`));

      if (selectedMove.statusEffect) {
        const statusAccuracy = Math.random() * 100;
        if (
          selectedMove.statusEffect.effectChance > statusAccuracy ||
          critDamage
        ) {
          console.log(
            chalk.blue(
              `[${defender.name} has been ${selectedMove.statusEffect.name}]\n`.toUpperCase()
            )
          );
          defender.status = selectedMove.statusEffect;
        }
      }
      return outgoingDamage;
    }
  }

  hasFainted() {
    if (this.hitPoints > 0) return false;
    return true;
  }
}

module.exports = {
  Pokemon,
};
