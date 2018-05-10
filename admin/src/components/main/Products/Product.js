import React from 'react';

import Card from 'antd/lib/card';

import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
const Name = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const renderCardContent = ({ description }) => {
  return (
    <div>
      <h3>{description}Holaass</h3>
    </div>
  );
};
const ProductCard = styled(Card)`
  width: 100%;
  min-height: 400px;
`;
const Product = ({ img, description }) => {
  return (
    <ProductCard
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
      actions={[
        <Icon type="edit" />,
        <Icon type="close-circle" />,
        <Icon type="delete" />
      ]}
    >
      <Name>Titulo</Name>
    </ProductCard>
  );
};

export default Product;
