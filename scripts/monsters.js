class Pokemon {
  constructor(name) {
    this.name = name;
    this.type = "normal";
    this.hitPoints = 100;
    this.attackDamage = 10;
    this.moves = {
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
    };
  }

  isEffectiveAgainst(type) {
    return false;
  }

  isWeakTo(type) {
    return false;
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
  }

  useMove(selectedMove, attacker, defender) {
    let baseDamage = this.attackDamage;
    let critDamage = 0;
    let effectiveTypeBonus = 0;
    let powerMoveBonus = 0;
    let outgoingDamage = 0;

    const accuracy = Math.random() * 100;
    if (
      (selectedMove.strength === "power" && accuracy < 20) ||
      (selectedMove.strength === "basic" && accuracy < 5)
    ) {
      console.log(
        `${attacker.name} tried to use ${selectedMove.name} against ${defender.name} but missed`
      );
      return 0;
    } else {
      if (
        attacker.type !== selectedMove.type &&
        selectedMove.type !== "normal"
      ) {
        baseDamage *= 0.8;
      }
      if (selectedMove.strength === "power") {
        powerMoveBonus = baseDamage * 0.2;
      }
      if (defender.isWeakTo(selectedMove.type)) {
        effectiveTypeBonus = baseDamage * 0.25;
      }
      if (defender.isEffectiveAgainst(selectedMove.type)) {
        effectiveTypeBonus = baseDamage * -0.25;
      }
      const critRoll = Math.random() * 100;
      if (critRoll > 85) {
        critDamage = baseDamage * 0.5;
        outgoingDamage = Math.round(
          baseDamage + critDamage + effectiveTypeBonus + powerMoveBonus
        );
        console.log(
          `${this.name} used ${selectedMove.name} and landed a critical hit!!! It dealt ${outgoingDamage} damage!`
        );
      } else {
        outgoingDamage = Math.round(
          baseDamage + effectiveTypeBonus + powerMoveBonus
        );
        console.log(
          `${this.name} used ${selectedMove.name}. It dealt ${outgoingDamage} damage!`
        );
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
  isEffectiveAgainst(type) {
    if (type === "grass") return true;
    return false;
  }
  isWeakTo(type) {
    if (type === "water") return true;
    return false;
  }
}

class Water extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "water";
  }
  isEffectiveAgainst(type) {
    if (type === "fire") return true;
    return false;
  }
  isWeakTo(type) {
    if (type === "grass") return true;
    return false;
  }
}

class Grass extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "grass";
  }
  isEffectiveAgainst(type) {
    if (type === "water") return true;
    return false;
  }
  isWeakTo(type) {
    if (type === "fire") return true;
    return false;
  }
}

class Charmander extends Fire {
  constructor(name) {
    super(name);
    this.attackDamage = 17;
    this.hitPoints = 40;
    this.moves = {
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      ember: {
        name: "ember",
        type: "fire",
        strength: "basic",
      },
    };
  }
}

class Squirtle extends Water {
  constructor(name) {
    super(name);
    this.attackDamage = 16;
    this.hitPoints = 46;
    this.moves = {
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      waterGun: {
        name: "water gun",
        type: "water",
        strength: "basic",
      },
    };
  }
}

class Bulbasaur extends Grass {
  constructor(name) {
    super(name);
    this.attackDamage = 14;
    this.hitPoints = 54;
    this.moves = {
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      vineWhip: {
        name: "vine whip",
        type: "grass",
        strength: "basic",
      },
    };
  }
}

class Rattata extends Pokemon {
  constructor(name) {
    super(name);
    this.attackDamage = 15;
    this.hitPoints = 50;
    this.moves = {
      tackle: {
        name: "tackle",
        type: "normal",
        strength: "basic",
      },
      roundHouseKick: {
        name: "round-house kick",
        type: "normal",
        strength: "power",
      },
    };
  }
}

class Vaporeon extends Water {
  constructor(name) {
    super(name);
    this.attackDamage = 16;
    this.hitPoints = 46;
    this.moves = {
      hydroPump: {
        name: "hydro pump",
        type: "water",
        strength: "power",
      },
    };
  }
}

class Flareon extends Fire {
  constructor(name) {
    super(name);
    this.attackDamage = 17;
    this.hitPoints = 40;
    this.moves = {
      fireBlast: {
        name: "fire blast",
        type: "fire",
        strength: "power",
      },
    };
  }
}

class Leafeon extends Grass {
  constructor(name) {
    super(name);
    this.attackDamage = 14;
    this.hitPoints = 54;
    this.moves = {
      gigaDrain: {
        name: "giga drain",
        type: "grass",
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
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Vaporeon,
  Leafeon,
  Flareon,
};
