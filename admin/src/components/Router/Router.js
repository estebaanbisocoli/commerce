import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import MainRoute from './MainRoute';
const RouterLocal = styled.div`
  height: 900px;
`;

const Router = props => {
  return <MainRoute />;
};

Router.propTypes = {};

export default Router;
