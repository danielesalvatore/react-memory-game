import ReactGA from 'react-ga';

export default class GAEventTracker {
    constructor() {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    }

    set(opts) {
        ReactGA.set(opts)
    }

    event(opts) {
        ReactGA.event(opts)
    }

    pageview(location) {
        ReactGA.pageview(location);
    }

    timing(opts) {
        ReactGA.timing(opts);
    }
}