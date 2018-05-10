import React from 'react';

import styled from 'styled-components';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import Spacer from '../shared/Spacer';

import SingUpWelcome from './SingUpWelcome';

import { SingUpForm } from './';

import { Footer } from 'antd/lib/layout';
const ContainerLocal = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
  background-color: #e6fffb;
`;
const BarLocal = styled.div`
  position: absolute;
  box-shadow: 0px 0px 1px #999;
  top: 0;
  left: 0;

  width: 100%;
  height: 250px;
  background-color: #36cfc9;
`;

const LogoBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 250px;
  background-color: white;
  z-index: 1;
`;

const Logo = styled.div;
const FormContainer = styled.div`
  width: 600px;
  position: absolute;
  background-color: white;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 25px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
`;
const MyFooter = styled.div`
  width: 100%;
  background-color: #36cfc9;
  height: 68px;
  z-index: 1;
`;
const SingUpWrapper = () => {
  return (
    <ContainerLocal>
      <BarLocal />

      <FormContainer>
        <SingUpWelcome />
        <Spacer height="30px" />
        <SingUpForm />
      </FormContainer>
    </ContainerLocal>
  );
};

export default SingUpWrapper;
