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
    }
    if (selectedMove.strength === "power") missChance *= 2;
    return missChance;
  }

  calculateMoveBaseDamage(selectedMove) {
    let baseDamage = this.attackDamage;

    if (this.type !== selectedMove.type) baseDamage *= 0.75;
    if (selectedMove.strength === "power") baseDamage *= 1.2;

    return Math.round(baseDamage);
  }

  useMove(selectedMove, defender) {
    console.log(
      chalk.yellow(
        `\n"${this.name}, use ${selectedMove.name}!"\n`.toUpperCase()
      )
    );

    let outgoingDamage = 0;

    const missChance = this.calculateMoveMissChance(selectedMove);
    const randomPercentage = Math.random() * 100;

    if (randomPercentage < missChance) {
      console.log(chalk.red(`\nMISS\n`));
    } else {
      outgoingDamage = this.calculateMoveBaseDamage(selectedMove, defender);
      if (defender.defendsPoorlyAgainst(selectedMove.type)) {
        outgoingDamage *= 2;
        console.log(chalk.green(`\nEFFECTIVE TYPE (DOUBLE DAMAGE)\n`));
      }
      if (defender.defendsWellAgainst(selectedMove.type)) {
        outgoingDamage *= 0.5;
        console.log(chalk.red(`\nINEFFECTIVE TYPE (HALF DAMAGE)\n`));
      }

      const critRoll = Math.random() * 100;
      if (critRoll > 90 + missChance / 10) {
        outgoingDamage *= 1.5;
        console.log(
          chalk.blue(`\nCRITICAL HIT! [${outgoingDamage.toFixed()} DAMAGE]`)
        );
      } else console.log(chalk.blue(`\nHIT! [${outgoingDamage} DAMAGE]\n`));

      if (selectedMove.statusEffect) {
        const statusAccuracy = Math.random() * 100;
        if (selectedMove.statusEffect.effectChance > statusAccuracy) {
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
    return outgoingDamage.toFixed();
  }

  hasFainted() {
    if (this.hitPoints > 0) return false;
    return true;
  }
}

module.exports = {
  Pokemon,
};
