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
    isEffectiveAgainst(enemy) {
        if (enemy.type === "grass") return true;
        return false;
    }
    isWeakTo(enemy) {
        if(enemy.type === 'water') return true;
        return false;
    }
}

class Water extends Pokemon {
    constructor(name) {
        super(name);
        this.type = 'water';
    }
    isEffectiveAgainst(enemy) {
        if (enemy.type === "fire") return true;
        return false;
    }
    isWeakTo(enemy) {
        if(enemy.type === 'grass') return true;
        return false;
    }
}

class Grass extends Pokemon {
    constructor(name) {
        super(name);
        this.type = 'grass';
    }
    isEffectiveAgainst(enemy) {
        if (enemy.type === "water") return true;
        return false;
    }
    isWeakTo(enemy) {
        if(enemy.type === 'fire') return true;
        return false;
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


class Bulbasaur extends Grass {
  constructor(name) {
    super(name);
    this.move = "vine whip";
  }
}

class Rattata extends Pokemon {
  constructor(name) {
    super(name);
    this.move = "round-house kick";
  }
}

module.exports = { Pokemon, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata }