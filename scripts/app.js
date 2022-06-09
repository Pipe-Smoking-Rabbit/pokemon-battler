class Pokemon {
    constructor(name) {
        this.name = name;
        this.type = "normal";
        this.hitPoints = 100;
        this.attackDamage = 10;
        this.move = "tackle";
    }

    isEffectiveAgainst(enemy) {
        if (this.type === "fire" && enemy.type === "grass") return true
        if (this.type === "water" && enemy.type === "fire") return true
        if (this.type === "grass" && enemy.type === "water") return true
    return false
    } 

    isWeakTo(enemy) {
        if (this.type === "normal" || enemy.type === "normal") return false
        return !this.isEffectiveAgainst(enemy)
    }

    takeDamage(damage) {
        this.hitPoints -= damage
    }

    useMove() {
        console.log(`${this.name} used ${this.move}.`);
        return this.attackDamage
    }

    hasFainted() {
        if (this.hitPoints > 0) return false
        return true
    }
}


module.exports = { Pokemon }