const { Pokeball } = require("./pokeball")

class Trainer {
    constructor(name) {
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
        } console.log("You don't have any empty pokeballs left!");
    }
}

module.exports = { Trainer }