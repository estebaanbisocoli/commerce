import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, SingUp } from './';
const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/singup" component={SingUp} />
    </Switch>
  );
};

export default Router;
