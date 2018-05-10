import React from 'react';
import Alert from 'antd/lib/alert';

import styled from 'styled-components';

const WelcomeMessage = styled(Alert)`
  width: 100%;
`;
const SingUpWelcome = () => {
  return (
    <WelcomeMessage
      message="Hola!"
      description="A continuación se le requerira que ingresa informacion"
    />
  );
};

export default SingUpWelcome;
