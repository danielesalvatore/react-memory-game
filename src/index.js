import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/index';
import {Provider} from 'react-redux'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';

import registerServiceWorker from './registerServiceWorker';

const target = document.querySelector('#root');

ReactDOM.render(<Provider store={store}>
        <App/>
    </Provider>,
    target);

registerServiceWorker();
