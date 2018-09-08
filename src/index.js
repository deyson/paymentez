/* global document */
import WebFontLoader from 'webfontloader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import Root from './Root';
// import rootReducer from './reducers'
import members from './reducers/MembersReducers';
import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const store = createStore(members);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
