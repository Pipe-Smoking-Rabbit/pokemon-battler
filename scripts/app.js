class Pokemon {
    constructor(name) {
        this.name = name;
        this.type = "normal";
        this.hitPoints = 100;
        this.attackDamage = 10;
        this.move = "tackle";
    }

    isEffectiveAgainst(enemy) {
        if (this.type === "fire" && enemy.type === "grass") return true;
        if (this.type === "water" && enemy.type === "fire") return true;
        if (this.type === "grass" && enemy.type === "water") return true;
        return false;
    } 

    isWeakTo(enemy) {
        if (this.type === "normal" || enemy.type === "normal") return false;
        if (this.type === enemy.type) return false;
        return !this.isEffectiveAgainst(enemy);
    }

    takeDamage(damage) {
        this.hitPoints -= damage;
    }

    useMove() {
        console.log(`${this.name} used ${this.move}.`);
        return this.attackDamage;
    }

    hasFainted() {
        if (this.hitPoints > 0) return false;
        return true;
    }
}

class Fire extends Pokemon {
    constructor(name) {
        super(name);
        this.type = 'fire';
    }
}

class Water extends Pokemon {
    constructor(name) {
        super(name);
        this.type = 'water';
    }
}

class Grass extends Pokemon {
    constructor(name) {
        super(name);
        this.type = 'grass';
    }
}

class Charmander extends Fire {
    constructor(name) {
        super(name);
        this.move = "ember"
    }
}

class Squirtle extends Water {
  constructor(name) {
    super(name);
    this.move = "water gun";
  }
}


module.exports = { Pokemon, Fire, Water, Grass, Charmander, Squirtle }