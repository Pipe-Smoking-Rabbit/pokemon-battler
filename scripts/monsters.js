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

  useMove(selectedMove, attacker, defender) {
    console.clear();
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
    let missChance = 15;
    if (attacker.status.missChanceMultiplier) {
      consoleMessage += `\n${attacker.name} is struggling to see properly, and is less likely to land their attack.\n`
      missChance * attacker.status.missChanceMultiplier;
    }
    if (
      (selectedMove.strength === "basic" && accuracy < missChance) ||
      (selectedMove.strength === "power" && accuracy < missChance * 2)
    ) {
      consoleMessage += `\n${attacker.name} ${flavour} ${selectedMove.name} against ${defender.name}... but completely misses... How embarrasing!\n`;
      console.log(consoleMessage);
      return 0;
    } else {
      if (attacker.type !== selectedMove.type) {
        baseDamage *= 0.85;
      }
      const critRoll = Math.random() * 100;
      if (critRoll > 85) {
        critDamage = baseDamage * 0.5;
        consoleMessage += `\n${this.name} ${flavour} ${selectedMove.name}, landing a critical hit!!!\n`;
      } else {
        outgoingDamage = Math.round(
          baseDamage + effectiveTypeBonus + powerMoveBonus
        );
        consoleMessage += `\n${this.name} ${flavour} ${selectedMove.name}, striking ${defender.name} firmly!\n`;
      }
      if (selectedMove.strength === "power") {
        powerMoveBonus = baseDamage * 0.2;
      }
      if (defender.defendsPoorlyAgainst(selectedMove.type)) {
        effectiveTypeBonus = baseDamage * 0.33;
        consoleMessage += `\n(That move type seemed to be very effective against ${defender.name})\n`;
      }
      if (defender.defendsWellAgainst(selectedMove.type)) {
        effectiveTypeBonus = baseDamage * -0.33;
        consoleMessage += `\n(That move type seemed to be rather ineffective against ${defender.name})\n`;
      }
      if (selectedMove.statusEffect) {
        consoleMessage += `\n${defender.name} has been ${selectedMove.statusEffect.name}\n`;
        defender.status = selectedMove.statusEffect;
      }
      outgoingDamage = Math.round(
        baseDamage + critDamage + effectiveTypeBonus + powerMoveBonus
      );
      consoleMessage += `\n${attacker.name} delt ${outgoingDamage} damage with that move!\n`;
      console.log(consoleMessage);Pokeball
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
      Flamethrower: {
        name: "flamethrower",
        type: "fire",
        strength: "power",
        statusEffect: {
          name: "burnt",
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
