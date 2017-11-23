import GAEventTracker from "./GAEventTracker"
import {FLIP_CARD, FETCH_CARDS_SUCCESS, GAME_VICTORY} from '../../containers/App/constants'
import store from '../../store'
import {getStatus} from "../../containers/App/selectors";

function createAnalyticsMiddleware(extraArgument) {

    const EventTracker = new GAEventTracker();

    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        switch (action && action.type && action.type.toUpperCase()) {
            case FLIP_CARD :
                EventTracker.event({
                    category: 'card',
                    action: 'flip',
                    value: 1
                });
                break;
            case FETCH_CARDS_SUCCESS :
                // amount of card of the game
                const amountOfCards = action.response && Array.isArray(action.response.result) ? action.response.result.length : 1
                EventTracker.event({
                    category: 'match',
                    action: 'create',
                    value: amountOfCards
                });
                break;
            case GAME_VICTORY :
                const status = getStatus(store.getState());
                const duration = action.finishAt - status.startAt;

                EventTracker.timing({
                    category: 'match',
                    variable: 'victory',
                    value: duration, // in milliseconds
                });
                break;
            default:
            // do nothing
        }

        return next(action);
    };
}

const analytics = createAnalyticsMiddleware();
analytics.withExtraArgument = createAnalyticsMiddleware;

export default analytics;