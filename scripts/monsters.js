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
    console.clear();
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

class Fire extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "fire";
  }
  defendsWellAgainst(type) {
    if (type === "grass" || type === "ice") return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "water" || type === "ground") return true;
    return false;
  }
}

class Water extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "water";
  }
  defendsWellAgainst(type) {
    if (type === "fire" || type === "water" || type === "ice") return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "grass" || type === "electric") return true;
    return false;
  }
}

class Grass extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "grass";
  }
  defendsWellAgainst(type) {
    if (type === "water" || type === "ground" || type === "electric")
      return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "fire" || type === "flying") return true;
    return false;
  }
}

class Electric extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "electric";
  }
  defendsWellAgainst(type) {
    if (type === "flying" || type === "electric") return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "ground") return true;
    return false;
  }
}

class Ground extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "ground";
  }
  defendsWellAgainst(type) {
    if (type === "electric" || type === "poison" || type === "rock")
      return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "water" || type === "grass" || type === "ice") return true;
    return false;
  }
}

class Flying extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "flying";
  }
  defendsWellAgainst(type) {
    if (type === "ground" || type === "fighting" || type === "grass")
      return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "electric" || type === "ice" || type === "rock") return true;
    return false;
  }
}

class Fighting extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "fighting";
  }
  defendsWellAgainst(type) {
    if (type === "rock" || type === "fighting") return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "flying") return true;
    return false;
  }
}

class Ice extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "ice";
  }
  defendsWellAgainst(type) {
    if (type === "ice") return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (type === "fire" || type === "fighting" || type === "rock") return true;
    return false;
  }
}

class Rock extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "rock";
  }
  defendsWellAgainst(type) {
    if (
      type === "flying" ||
      type === "normal" ||
      type === "fire" ||
      type === "poison"
    )
      return true;
    return false;
  }
  defendsPoorlyAgainst(type) {
    if (
      type === "water" ||
      type === "grass" ||
      type === "fighting" ||
      type === "ground"
    )
      return true;
    return false;
  }
}

class Mankey extends Fighting {
  constructor(name) {
    super(name);
  }
}

class Pidgey extends Flying {
  constructor(name) {
    super(name);
    this.attackDamage = 12;
    this.hitPoints = 32;
    this.maxHP = 32;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      Gust: {
        name: "gust",
        type: "flying",
        strength: "basic",
      },
      "Sand Attack": {
        name: "sand attack",
        type: "flying",
        strength: "power",
        statusEffect: {
          name: "blinded",
          turnsRemaining: 1,
          effectChance: 75,
          missChanceMultiplier: 3,
        },
      },
    };
  }
}

class Geodude extends Ground {
  constructor(name) {
    super(name);
    this.attackDamage = 12;
    this.hitPoints = 66;
    this.maxHP = 65;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      "Rock Throw": {
        name: "rock throw",
        type: "ground",
        strength: "basic",
      },
      "Land Slide": {
        name: "land slide",
        type: "ground",
        strength: "power",
      },
    };
  }
}

class Pikachu extends Electric {
  constructor(name) {
    super(name);
    this.attackDamage = 18;
    this.hitPoints = 36;
    this.maxHP = 36;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      Thunderbolt: {
        name: "thunderbolt",
        type: "electric",
        strength: "basic",
      },
      "Storm Strike": {
        name: "storm strike",
        type: "electric",
        strength: "power",
      },
    };
  }
}

class Charmander extends Fire {
  constructor(name) {
    super(name);
    this.attackDamage = 17;
    this.hitPoints = 40;
    this.maxHP = 40;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      Ember: {
        name: "ember",
        type: "fire",
        strength: "basic",
      },
      Flamethrower: {
        name: "flamethrower",
        type: "fire",
        strength: "power",
        statusEffect: {
          name: "burnt",
          effectChance: 95,
          turnsRemaining: 1,
          damage: 3,
        },
      },
    };
  }
}

class Squirtle extends Water {
  constructor(name) {
    super(name);
    this.attackDamage = 16;
    this.hitPoints = 46;
    this.maxHP = 46;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      "Water Gun": {
        name: "water gun",
        type: "water",
        strength: "basic",
      },
      "Hydro pump": {
        name: "hydro pump",
        type: "water",
        strength: "power",
      },
    };
  }
}

class Bulbasaur extends Grass {
  constructor(name) {
    super(name);
    this.attackDamage = 14;
    this.hitPoints = 54;
    this.maxHP = 54;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      "Vine Whip": {
        name: "vine whip",
        type: "grass",
        strength: "basic",
      },
      "Trunk Hammer": {
        name: "trunk hammer",
        type: "grass",
        strength: "power",
      },
      "Poison Powder": {
        name: "poison powder",
        type: "poison",
        strength: "basic",
        statusEffect: {
          name: "poisoned",
          effectChance: 90,
          turnsRemaining: 3,
          damage: 1,
        },
      },
    };
  }
}

class Rattata extends Pokemon {
  constructor(name) {
    super(name);
    this.attackDamage = 15;
    this.hitPoints = 50;
    this.maxHP = 50;
    this.moves = {
      Tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      "Round-House Kick": {
        name: "round-house kick",
        type: "normal",
        strength: "power",
      },
    };
  }
}

module.exports = {
  Pokemon,
  Fire,
  Water,
  Grass,
  Pikachu,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Geodude,
  Pidgey,
};
