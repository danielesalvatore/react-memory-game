import {UI_BASE_PATH} from '../const'
import {AMOUNT_OF_CARD_PAIRS, CARD_FLIP_SPEED_IN_MS} from '../../src/config'

describe('Main page', () => {

    it('should display main page', () => {
        cy.visit(UI_BASE_PATH);

        cy.url().should('eq', UI_BASE_PATH);

    });

    it('should render cards', () => {

        expect(cy.get(".react-card-flip")).not.to.be.undefined;

        cy.get(".react-card-flip").then(cards => {
            expect(cards.length).to.be.equal(AMOUNT_OF_CARD_PAIRS * 2)
        })
    });

    it('should flip a card', () => {

        cy.get(".react-card-flip").first().find(".react-card-back").click();

        cy.wait(CARD_FLIP_SPEED_IN_MS);

        cy.get(".react-card-flip").first().find("img").should('be.visible')
    })
});


