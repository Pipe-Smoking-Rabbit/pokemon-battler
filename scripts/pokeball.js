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
        console.log(`\nYou caught ${target.name}!\n`);
      } else {
        console.log(`There was no room to capture ${target.name}.`);
      }
    } else {
      if (!this.isEmpty()) {
        console.log(
          `\nYou throw your pokeball and ${this.contains()}, a ${
            this.storage.type
          } type pokemon, bursts out ready to fight.\n"GO ${this.contains().toUpperCase()}!!"\n`
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
