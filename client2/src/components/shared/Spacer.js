import React from 'react';

import styled from 'styled-components';

const LocalBox = styled.div`
  height: ${props => props.height || '15px'};
`;
const Spacer = ({ height }) => <LocalBox height={height} />;

export default Spacer;
