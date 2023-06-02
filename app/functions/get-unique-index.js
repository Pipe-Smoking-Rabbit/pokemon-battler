const {
    Charmander,
    Squirtle,
    Bulbasaur,
    Rattata,
    Pidgey,
    Pikachu,
    Geodude,
  } = require("../classes/monsters");

function getUniqueIndex(num1, num2) {
    const allEnemyPokemon = [
        new Charmander("Charmander"),
        new Bulbasaur("Bulbasaur"),
        new Pidgey("Pidgey"),
        new Squirtle("Squirtle"),
        new Rattata("Rattata"),
        new Pikachu("Pikachu"),
        new Geodude("Geodude"),
      ];
    let randomNumber = Math.floor(Math.random() * allEnemyPokemon.length);
    while (randomNumber === num1 || randomNumber === num2) {
      randomNumber = Math.floor(Math.random() * allEnemyPokemon.length);
    }
    return randomNumber;
  }

  module.exports = getUniqueIndex