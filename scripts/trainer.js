const { instantiateBattle } = require("./battle")

class Trainer {
    constructor(name, Pokeball) {
        this.name = name
        this.belt = [new Pokeball, new Pokeball, new Pokeball, new Pokeball, new Pokeball, new Pokeball]
    }
    catch(target) {
        for (let i = 0; i < this.belt.length; i++) {
            const pokeball = this.belt[i]
            if (pokeball.isEmpty()) {
                pokeball.throw(target)
                return
            }
        }
        console.log("You don't have any empty pokeballs left!");
    }
    getPokemon(name) {
        for (let i = 0; i < this.belt.length; i++) {
            const pokeball = this.belt[i]
            if (pokeball.storage !== null) {
                if (pokeball.storage.name === name) {
                    return pokeball.throw();
                }
            }
        }
        console.log("You don't have a pokemon by that name")
        return "You don't have a pokemon by that name"
    }
    fight(enemyPlayer) {
        instantiateBattle(this, enemyPlayer);
    }
}

module.exports = { Trainer }