const pokemon = require('../scripts/app');

describe('Pokemon Class', () => {
    test('Should return an instance of the Pokemon class', () => {
        const basicMon = new pokemon.Pokemon();
        expect(basicMon).toBeInstanceOf(pokemon.Pokemon);
    })
    test('Returned instance has the name property', () => {
        const mitchsMon = new pokemon.Pokemon('Ian');
        expect(mitchsMon.name).toBe('Ian');
    })
    test('Returned instance has the type property, defaulting to "normal"', () => {
        const mitchsMon = new pokemon.Pokemon('Ian');
        expect(mitchsMon.type).toBe('normal');
    })
    test('Returned instance has the hitPoints property', () => {
        const mitchsMon = new pokemon.Pokemon('Ian');
        expect(mitchsMon.hasOwnProperty('hitPoints')).toBe(true);
    })
    test('Returned instance has the attackDamage property', () => {
        const mitchsMon = new pokemon.Pokemon('Ian');
        expect(mitchsMon.hasOwnProperty('attackDamage')).toBe(true);
    })
    test('Returned instance has the move property, defaulting to "tackle"', () => {
        const mitchsMon = new pokemon.Pokemon('Ian');
        expect(mitchsMon.move).toBe("tackle");
    })
})