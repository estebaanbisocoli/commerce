import React from 'react';

import Layout from 'antd/lib/layout';
import { Header, Sider, Content, Footer } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Divider from '../shared/Divider';
import Router from '../Router/Router';
const Main = () => {
  return (
    <Layout>
      <Header />

      <Layout>
        <Sider width={150} style={{ background: '#fff' }}>
          <Menu>
            <Divider />
            <Menu.Item key="1">Mis Productos</Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content style={{ minHeight: '800px' }}>
            <Router />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Main;
