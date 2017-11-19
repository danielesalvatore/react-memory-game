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