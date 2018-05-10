import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const DividerScoped = styled.div`
  height: ${props => (props.height ? props.height : '36px')};
`;
const Divider = ({ height }) => {
  return <DividerScoped />;
};

Divider.propTypes = {
  height: PropTypes.string
};

Divider.defaultProps = {
  height: '36px'
};

export default Divider;
