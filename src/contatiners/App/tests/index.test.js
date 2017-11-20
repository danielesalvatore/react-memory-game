import * as actions from '../actions'

describe('actions logic', () => {

    const cards = [
        {
            matched: true,
        },
        {
            matched: true,
        }];

    it('should say game is won', () => {
        expect(actions.isGameWon(cards)).toBe(true)
    });

    it('should say game is not won yet', () => {

        cards.push({
            matched: false,
        });

        expect(actions.isGameWon(cards)).toBe(false)
    });

});