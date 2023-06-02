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

  calculateMoveMissChance(selectedMove) {
    let missChance = 15;
    if (this.status.missChanceMultiplier) {
      missChance *= this.status.missChanceMultiplier;
      // this.status.turnsRemaining--;
      // if (!this.status.turnsRemaining) this.status = {};
    }
    if (selectedMove.strength === "power") missChance *= 2;
    return missChance;
  }

  useMove(selectedMove, defender) {
    console.log(
      chalk.yellow(
        `\n"${this.name}, use ${selectedMove.name}!"\n`.toUpperCase()
      )
    );
    let baseDamage = this.attackDamage;
    let critDamage = 0;
    let outgoingDamage = 0;

    const missChance = this.calculateMoveMissChance(selectedMove);
    const accuracy = Math.random() * 100;

    if (accuracy < missChance) {
      console.log(chalk.red(`\nMISS\n`));
    } else {
      if (this.type !== selectedMove.type) {
        baseDamage *= 0.75;
      }
      if (defender.defendsPoorlyAgainst(selectedMove.type)) {
        baseDamage *= 2;
        console.log(chalk.green(`\nEFFECTIVE TYPE (DOUBLE DAMAGE)\n`));
      }
      if (defender.defendsWellAgainst(selectedMove.type)) {
        baseDamage *= 0.5;
        console.log(chalk.red(`\nINEFFECTIVE TYPE (HALF DAMAGE)\n`));
      }
      if (selectedMove.strength === "power") {
        baseDamage *= 1.2;
      }
      const critRoll = Math.random() * 100;
      if (critRoll > 90 + missChance / 100) {
        critDamage = baseDamage * 0.5;
      }
      outgoingDamage = Math.round(baseDamage + critDamage);
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
              `${defender.name} is suffering from: ${selectedMove.statusEffect.name}\n`.toUpperCase()
            )
          );
          defender.status = selectedMove.statusEffect;
        }
      }
      if (this.status.missChanceMultiplier) {
        this.status.turnsRemaining--;
        if (!this.status.turnsRemaining) {
          console.log(
            chalk.blue(
              `${this.name} has recovered from: ${this.status.name}\n`.toUpperCase()
            )
          );
          this.status = {};
        }
      }
    }
    return outgoingDamage;
  }

  hasFainted() {
    if (this.hitPoints > 0) return false;
    return true;
  }
}

module.exports = {
  Pokemon,
};
