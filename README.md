# Pokemon Battler
## How to Play...
To play the game simply type the below commands into the bash terminal from the base of this repo:
```
npm install
npm start
```

## How the Game Works
### Choosing Your Pokemon
Start by choosing how many Pokemon monsters you want to fight with. Your computer opponent will have `3 by default`, so you may choose to have `2 / 3 / or 4` depending on how confident you are in your skills.  

Each Pokemon species available has a type, displayed next to the species name. Some types of Pokemon are more effective against others, `(e.g. - water is effective against fire)`. 

*Tip: Try to ensure you are matching up your Pokemon wisely against your opponent's.* 

### Taking Your Turn
You will get to move first, then it will be your opponent's turn, and so on. Each turn you will have to option to pick an attack to perform. Most Pokemon have 3 attacks to chose from. Every Pokemon can perform `"tackle"` which is a `normal` type move and does not gain any benefit from the Pokemon's type. Their other attacks will usually be a `basic strength` attack and a `powerful strength` attack. Some attacks may also have `special effects` which hinder your opponent's Pokemon!

*Tip: powerful moves do more damage but be warned, they are less reliable!* 

### Changing Pokemon
If you are in an unfavourable match up you may want to consider `swapping` to another Pokemon. This can give you an upper hand in the fight, but comes at a cost of `not being able to attack` that turn, so chose your moments to swap wisely!

### Winning or Losing
You win or lose when either all your opponents Pokemons have fainted, or all of your own! 

*Tip: at any point you may chose to run away, but this will immediately forfeit the game.*

### `Good Luck!`


# To-do
* Computer can decide to change it's pokemon if matchup is unfavourable
* Complete addition of Mankey, and two more pokemons for Ice and Rock yet to be decided
* Address balancing to nerf damage when using a non-native move type such as tackle
* Save file that will reload a player to their trainer 
* Pokemon XP which is saved with the trainer
