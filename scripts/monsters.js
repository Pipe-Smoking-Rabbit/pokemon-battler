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
    let consoleMessage = "";
    let flavour = "";

    const flavourPool = [
      `centres their concentration before letting loose`,
      `sets their stance firmly, then uses`,
      `receives their command and launches`,
      `rushes forward and unleashes`,
    ];
    flavour = flavourPool[Math.floor(Math.random() * flavourPool.length)];

    const accuracy = Math.random() * 100;
    if (
      (selectedMove.strength === "power" && accuracy < 25) ||
      (selectedMove.strength === "basic" && accuracy < 10)
    ) {
      consoleMessage += `${attacker.name} ${flavour} ${selectedMove.name} against ${defender.name}... but completely misses, leaving them looking a bit embarressed.`;
      console.log(consoleMessage);
      return 0;
    } else {
      if (attacker.type !== selectedMove.type) {
        baseDamage *= 0.85;
      }
      const critRoll = Math.random() * 100;
      if (critRoll > 85) {
        critDamage = baseDamage * 0.5;
        consoleMessage += `${this.name} ${flavour} ${selectedMove.name}, landing a critical hit!!!`;
      } else {
        outgoingDamage = Math.round(
          baseDamage + effectiveTypeBonus + powerMoveBonus
        );
        consoleMessage += `${this.name} ${flavour} ${selectedMove.name}, striking their opponent firmly!`;
      }
      if (selectedMove.strength === "power") {
        powerMoveBonus = baseDamage * 0.2;
      }
      if (defender.isWeakTo(selectedMove.type)) {
        effectiveTypeBonus = baseDamage * 0.33;
        consoleMessage += `\n\n(That move type seemed to be very effective against ${defender.name})`;
      }
      if (defender.isEffectiveAgainst(selectedMove.type)) {
        effectiveTypeBonus = baseDamage * -0.33;
        consoleMessage += `\n\n(That move type seemed to be rather ineffective against ${defender.name})`;
      }
      outgoingDamage = Math.round(
        baseDamage + critDamage + effectiveTypeBonus + powerMoveBonus
      );
      consoleMessage += `\n\n${attacker.name} delt ${outgoingDamage} damage to ${defender.name} with that move!`;
      console.log(consoleMessage);
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
    if (type === "water" || type === "ground") return true;
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
    if (type === "grass" || type === "electric") return true;
    return false;
  }
}

class Grass extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "grass";
  }
  isEffectiveAgainst(type) {
    if (type === "water" || type === "ground") return true;
    return false;
  }
  isWeakTo(type) {
    if (type === "fire") return true;
    return false;
  }
}

class Electric extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "electric";
  }
  isEffectiveAgainst(type) {
    if (type === "water" || type === "flying") return true;
    return false;
  }
  isWeakTo(type) {
    if (type === "ground") return true;
    return false;
  }
}

class Ground extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "ground";
  }
  isEffectiveAgainst(type) {
    if (type === "electric" || type === "fire") return true;
    return false;
  }
  isWeakTo(type) {
    if (type === "flying" || type === "grass") return true;
    return false;
  }
}

class Flying extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "flying";
  }
}

class Fighting extends Pokemon {
  constructor(name) {
    super(name);
    this.type = "fighting";
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
  }
}

class Geodude extends Ground {
  constructor(name) {
    super(name);
    this.attackDamage = 12;
    this.hitPoints = 66;
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
      "Firey vines": {
        name: "firey vines",
        type: "grass",
        strength: "basic",
      },
      Flamethrower: {
        name: "flamethrower",
        type: "fire",
        strength: "power"
      }
    };
  }
}

class Squirtle extends Water {
  constructor(name) {
    super(name);
    this.attackDamage = 16;
    this.hitPoints = 46;
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
      "Hot Steam": {
        name: "hot steam",
        type: "fire",
        strength: "basic",
      },
      "Hydro pump": {
        name: "hydro pump",
        type: "water",
        strength: "power"
      }
    };
  }
}

class Bulbasaur extends Grass {
  constructor(name) {
    super(name);
    this.attackDamage = 14;
    this.hitPoints = 54;
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
      "Liquid Sap": {
        name: "liquid sap",
        type: "water",
        strength: "basic",
      },
      "Trunk Hammer": {
        name: "trunk hammer",
        type: "grass",
        strength: "power"
      }
    };
  }
}

class Rattata extends Pokemon {
  constructor(name) {
    super(name);
    this.attackDamage = 15;
    this.hitPoints = 50;
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
  Pikachu,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Vaporeon,
  Leafeon,
  Flareon,
  Geodude
};
