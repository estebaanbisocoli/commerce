import React from 'react';

import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip'
const renderField = ({
  input,
  label,
  type,
  required,
  tooltip,
  meta: { touched, error }
}) => {
  return (
    <FormItem label={label} required={required}>
      <Input {...input} type={type} />
    </FormItem>
  );
};

export default renderField;
