import React from 'react';

import { Form, Button, Icon, Col, Row, Alert, Divider } from 'antd';
import { renderField } from './';
import validate from './validate';
import { Field, reduxForm, submit } from 'redux-form';
import styled from 'styled-components';

const WizardFormFirstPage = ({ dispatch, loading, handleSubmit, onSubmit }) => {
  return (
    <div>
      <Row gutter={20}>
        <Col sm={{ span: 24 }} lg={{ span: 6, offset: 6 }}>
          <Alert message="¡Bienvenido a la pagina donde vas a registrar tu empresa!" />
        </Col>
        <Col sm={{ span: 24 }} lg={{ span: 6 }}>
          <Alert message="¡Bienvenido a la pagina donde vas a registrar tu empresa!" />
        </Col>
      </Row>
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 20, offset: 4 }}>
            <Field
              name="nombre_fantasia"
              type="text"
              component={renderField}
              label="Nombre de la empresa"
            />
            <Field
              name="calle"
              type="text"
              component={renderField}
              label="Calle"
            />
            <Field
              name="altura"
              type="number"
              component={renderField}
              label="Altura"
            />"
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
            <Field
              name="cuit"
              type="number"
              component={renderField}
              label="C.U.I.T"
            />
            <Field
              name="telefono"
              type="number"
              component={renderField}
              label="Telefono"
            />
            <div style={{ float: 'right' }}>
              <Button.Group>
                <Button loading={loading} htmlType="submit" type="primary">
                  Siguiente<Icon type="right" />
                </Button>
              </Button.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(WizardFormFirstPage);
