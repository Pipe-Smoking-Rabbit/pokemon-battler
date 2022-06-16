class Pokemon {
  constructor(name) {
    this.name = name;
    this.type = "normal";
    this.hitPoints = 100;
    this.attackDamage = 10;
    this.move = "tackle";
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

  useMove() {
    let outgoingDamage = this.attackDamage;
    const critRoll = Math.random() * 100;
    if (critRoll > 75) {
      outgoingDamage *= 2;
      console.log("A critical hit!!!");
    }
    console.log(
      `${this.name} used ${this.move}. It dealt ${outgoingDamage} damage.`
    );
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
    this.move = "ember";
    this.secondaryMove = "vine whip";
  }
}

class Squirtle extends Water {
  constructor(name) {
    super(name);
    this.attackDamage = 16;
    this.hitPoints = 46;
    this.move = "water gun";
    this.secondaryMove = "ember";
  }
}

class Bulbasaur extends Grass {
  constructor(name) {
    super(name);
    this.attackDamage = 14;
    this.hitPoints = 54;
    this.move = "vine whip";
    this.secondaryMove = "water gun";
  }
}

class Rattata extends Pokemon {
  constructor(name) {
    super(name);
    this.attackDamage = 15;
    this.hitPoints = 50;
    this.move = "tackle";
    this.powerMove = "round-house kick";
  }
}

class Vaporeon extends Water {
  constructor(name) {
    super(name);
    this.attackDamage = 16;
    this.hitPoints = 46;
    this.move = "hydro pump";
  }
}

class Flareon extends Fire {
  constructor(name) {
    super(name);
    this.attackDamage = 17;
    this.hitPoints = 40;
    this.move = "fire blast";
  }
}

class Leafeon extends Grass {
  constructor(name) {
    super(name);
    this.attackDamage = 14;
    this.hitPoints = 54;
    this.move = "giga drain";
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
