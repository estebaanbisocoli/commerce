import React from 'react';

import styled from 'styled-components';

import Card from 'antd/lib/card';
import Divider from '../shared/Divider';

import ProductWrapper from './Products/ProductWrapper';
const ContainerMainContent = styled.div`
  margin: 36px 0 0 0;
  padding: 0 36px 0 36px;
`;
const CardBox = styled(Card)`
  width: 100%;
  height: 36px;
`;
const MainContent = () => {
  return (
    <ContainerMainContent>
      <CardBox />
      <Divider/>
      <ProductWrapper />
    </ContainerMainContent>
  );
};

export default MainContent;
