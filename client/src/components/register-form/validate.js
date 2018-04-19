const validate = values => {
  const errors = {};
  if (!values.nombre_fantasia) {
    errors.nombre_fantasia = 'Ingrese el nombre de la empresa';
  }
  if (!values.calle) {
    errors.calle = 'Ingrese el nombre de la calle';
  }
  if (!values.altura) {
    errors.altura = 'Ingrese la altura';
  }
  if (!values.email) {
    errors.email = 'Ingrese el email';
  }

  if (values.email) {
    const error =
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ? 'El email ingresado es invalido'
        : undefined;

    errors.email = error;
  }
  if (!values.nombreFantasia) {
    errors.nombreFantasia = 'Ingrese el nombre de la empresa';
  }
  if (!values.nombreFantasia) {
    errors.nombreFantasia = 'Ingrese el nombre de la empresa';
  }
  if (!values.nombreFantasia) {
    errors.nombreFantasia = 'Ingrese el nombre de la empresa';
  }

  return errors;
};
export default validate;
