class Pokemon {
    constructor(name) {
        this.name = name;
        this.type = "normal";
        this.hitPoints = 100;
        this.attackDamage = 10;
        this.move = "tackle";
    }
}


module.exports = { Pokemon }