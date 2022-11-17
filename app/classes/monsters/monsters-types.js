const { Pokemon } = require("./monsters-super");

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

module.exports = {
  Fire,
  Water,
  Grass,
  Ice,
  Rock,
  Ground,
  Flying,
  Fighting,
  Electric,
};
