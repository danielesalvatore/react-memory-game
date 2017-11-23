export const getIds = (state) =>
    state.cards.list.ids;

export const getIsFetching = (state) =>
    state.cards.list.isFetching;

export const getErrorMessage = (state) =>
    state.cards.list.errorMessage;

export const getCard = (state, id) =>
    state.cards.byId[id];

export const getCards = (state) =>
    state.cards.list.ids && state.cards.list.ids.map((id) => getCard(state, id));

export const getStatus = (state) =>
    state.status;

export const getCheckingMatchingCards = (state) =>
    state.status.checkingMatchingCards;

export const getCardIsFlipping = (state) =>
    state.status.cardIsFlipping;

export const getVictory = (state) =>
    state.status.victory;

export const getWaitingForPair = (state) =>
    getCards(state) && getCards(state).filter(c => !c.isFlipped).length % 2 !== 0;