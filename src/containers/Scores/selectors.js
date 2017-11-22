export const getIds = (state) =>
    state.scores.list.ids;

export const getIsFetching = (state) =>
    state.scores.list.isFetching;

export const getErrorMessage = (state) =>
    state.scores.list.errorMessage;

export const getScore = (state, id) =>
    state.scores.byId[id];

export const getScores = (state) =>
    state.scores.list.ids && state.scores.list.ids.map((id) => getScore(state, id));
