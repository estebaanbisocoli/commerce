import React from 'react';
import { Card, Layout } from 'antd';
import styled from 'styled-components';

const ElevatedCard = styled(Card)`
  @media (min-width: 800px) {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
const ElevatedHeader = styled(Layout.Header)``;

const ContentLocal = styled(Layout.Content)`
  padding: 20px 80px;
  @media (max-width: 800px) {
    padding: 0px;
  }
`;

const FormContainer = ({ children }) => {
  return (
    <Layout>
      <ElevatedHeader style={{ height: '68px' }} />
      <ContentLocal style={{}}>
        <ElevatedCard bordered={false}>{children}</ElevatedCard>
      </ContentLocal>
    </Layout>
  );
};

export default FormContainer;
