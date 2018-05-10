import React from 'react';

import FormItem from 'antd/lib/form/FormItem';
import { TextArea } from 'antd/lib/input';
const renderTextBox = ({
  input,
  label,
  type,
  required,
  tooltip,
  meta: { touched, error }
}) => {
  return (<FormItem>
    <TextArea></TextArea>
  </FormItem>)
};

export default renderTextBox;
