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

  isEffectiveAgainst(enemy) {
    return false;
  }

  isWeakTo(enemy) {
    return false;
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
  }

  useMove(selectedMove, attacker, defender) {
    let baseDamage = this.attackDamage;
    let critDamage = 0;
    let effectiveTypeDamage = 0;
    let outgoingDamage = 0;
    if (defender.isWeakTo(attacker.moves[selectedMove])) {
      effectiveTypeDamage = baseDamage * 0.25;
    }
    if (defender.isEffectiveAgainst(attacker.moves[selectedMove])) {
      effectiveTypeDamage = baseDamage * -0.25;
    }
    const critRoll = Math.random() * 100;
    if (critRoll > 85) {
      critDamage = baseDamage * 0.5;
      outgoingDamage = Math.round(
        baseDamage + critDamage + effectiveTypeDamage
      );
      console.log(
        `${this.name} used ${this.moves[selectedMove].name} and landed a critical hit!!! It dealt ${outgoingDamage} damage!`
      );
    } else {
      outgoingDamage = Math.round(baseDamage + effectiveTypeDamage);
      console.log(
        `${this.name} used ${this.moves[selectedMove].name}. It dealt ${outgoingDamage} damage!`
      );
    }
    return outgoingDamage;
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
  isEffectiveAgainst(enemy) {
    if (enemy.type === "grass") return true;
    return false;
  }
  isWeakTo(enemy) {
    if (enemy.type === "water") return true;
    return false;
  }
}

class Water extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "water";
  }
  isEffectiveAgainst(enemy) {
    if (enemy.type === "fire") return true;
    return false;
  }
  isWeakTo(enemy) {
    if (enemy.type === "grass") return true;
    return false;
  }
}

class Grass extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "grass";
  }
  isEffectiveAgainst(enemy) {
    if (enemy.type === "water") return true;
    return false;
  }
  isWeakTo(enemy) {
    if (enemy.type === "fire") return true;
    return false;
  }
}

class Charmander extends Fire {
  constructor(name) {
    super(name);
    this.attackDamage = 17;
    this.hitPoints = 40;
    this.moves = {
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
