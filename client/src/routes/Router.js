import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import FormContainer from '../containers/FormContainer';
import Home from '../components/homepage/Home';
const Router = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/singup" component={FormContainer} />
    </Switch>
  );
};

Router.propTypes = {};

export default Router;
