// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Login from './components/login/Login';

const isAuth = true;

const Root = ({ store }) => {
  let Base = App;
  if (!isAuth) {
    Base = Login;
  }
  return (
    <Provider store={store}>
      <Router>
        <Base />
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
