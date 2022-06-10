const inquirer = require('inquirer')
const { Trainer } = require("../scripts/trainer");
const { Pokeball } = require("../scripts/pokeball");
const { Pokemon, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata } = require("../scripts/monsters");



function instantiateBattle(player, enemyPlayer) {
    friendlyPokemon = [];
    enemyPokemon = [];
    for (let i = 0; i < player.belt.length; i++) {
        const currentMon = player.belt[i];
        if (currentMon.storage !== null) {
            friendlyPokemon.push(currentMon.storage);
        }
    }
    for (let i = 0; i < enemyPlayer.belt.length; i++) {
        const currentMon = enemyPlayer.belt[i];
        if (currentMon.storage !== null)
        enemyPokemon.push(currentMon.storage);
    }

    inquirer
        .prompt([
        {
            type: 'list',
            name: 'pokemon',
            message: 'Which pokemon do you choose?',
            choices: friendlyPokemon
        }
        ])
        .then((playerMon) => {
            enemyMon = enemyPokemon[Math.floor(Math.random() * enemyPokemon.length)]
            beginBattle(player.getPokemon(playerMon.pokemon), enemyMon)
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log('uh oh')
              } else {
                console.log('uh oh again')
              }
        })

};
function beginBattle(playerPokemon, enemyPokemon) {
    let playerTurn = true;
    console.log(playerPokemon)
    console.log(enemyPokemon)


    // while(!playerPokemon.hasFainted() && !enemyPokemon.hasFainted()) {
    //     if (playerTurn) 
    // }
}

module.exports = { instantiateBattle }