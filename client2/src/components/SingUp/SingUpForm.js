import React from 'react';

import { reduxForm, Field } from 'redux-form';

import { renderField } from './';

import Form from 'antd/lib/form';

import Button from 'antd/lib/button';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import styled from 'styled-components';

const validate = values => {
  const errors = {};
  return errors;
};

const LocalForm = styled(Form)``;

const TwoFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 36px;
`;
const PhoneField = ({ phones }) => {};
const SingUpForm = ({ handleSubmit }) => {
  return (
    <LocalForm onSubmit={handleSubmit}>
      <TwoFields>
        <Field
          col
          name="nombre_fantasia"
          label="Nombre de la empresa"
          component={renderField}
          type="text"
        />

        <Field name="email" label="Email" component={renderField} type="text" />
      </TwoFields>

      <Field
        name="direccion"
        type="text"
        label="Dirección"
        component={renderField}
      />
      <Field
        name="cuit"
        type="number"
        label="C.U.I.T"
        component={renderField}
      />
      <Button style={{}} type="primary" htmlType="submit">
        Submit
      </Button>
    </LocalForm>
  );
};

export default reduxForm({ form: 'singup', validate })(SingUpForm);
