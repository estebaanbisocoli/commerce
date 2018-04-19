import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
const { Item } = Form;

const renderField = ({
  layout,
  input,
  label,
  type,
  meta: { touched, error }
}) => {
  return (
    <Item
      {...layout}
      label={label}
      validateStatus={(touched && error && 'error') || null}
      hasFeedback={touched && error && true}
      help={touched && error}
      colon={false}
    >
      <Input {...input} type={type} />
    </Item>
  );
};

renderField.defaultProps = {
  layout: {
    labelCol: {
      md: { span: 24 },
      lg: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  }
};

export default renderField;
