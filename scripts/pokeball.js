class Pokeball {
  constructor() {
    this.storage = null;
  }
  isEmpty() {
    return this.storage ? false : true;
  }
  contains() {
    return this.storage ? this.storage.name : "Empty...";
  }
  throw(target) {
    if (target !== undefined) {
      if (this.isEmpty()) {
        this.storage = target;
        console.log(`You caught ${target.name}!`);
      } else {
        console.log(`There was no room to capture ${target.name}.`);
      }
    } else {
      if (!this.isEmpty()) {
        console.log(
          `You throw your pokeball and ${this.contains()}, a ${
            this.storage.type
          } type pokemon, bursts out ready to fight.\nGO ${this.contains().toUpperCase()}!!`
        );
        const thrownPokemon = this.storage;
        this.storage = null;
        return thrownPokemon;
      } else {
        console.log(`Sorry, that pokeball is empty.`);
      }
    }
  }
}

module.exports = { Pokeball };
