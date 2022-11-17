const {
  Fire,
  Water,
  Grass,
  Ice,
  Rock,
  Ground,
  Flying,
  Fighting,
  Electric,
} = require("./monsters-types");
const {Pokemon} = require("./monsters-super")

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
      "Poison Ivy": {
        name: "poison ivy",
        type: "grass",
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

class Mankey extends Fighting {
  constructor(name) {
    super(name);
  }
}

module.exports = {
  Pikachu,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Geodude,
  Pidgey,
};
