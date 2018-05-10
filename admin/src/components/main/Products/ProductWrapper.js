import React from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import Product from './Product';
import Divider from '../../shared/Divider';

const ProductWrapper = () => {
  return (
    <div>
      <Row gutter={12}>
        {[0, 1, 2].map(value => (
          <Col span={8}>
            <Product />
          </Col>
        ))}
      </Row>
      <Divider height="36px" />
      <Row gutter={12}>
        {[0, 1, 2].map(value => (
          <Col span={8}>
            <Product />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductWrapper;
