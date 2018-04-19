import actionType from '../actions';

//{
//   nombreFantasia: 'Empresa de Prueba',
//   altura: '1266',
//   email: 'estebaanbisocoli@gmail.com',
//   telefono: '2945400703',
//   calle: 'Belgrano',
//   cuit: '38800209'
// };
const formatDataToSend = empresa => {
  return {
    nombre_fantasia: empresa.nombre_fantasia || null,
    direccion:
      (empresa.hasOwnProperty('calle') &&
        empresa.hasOwnProperty('altura') &&
        empresa.calle + ' ' + empresa.altura) ||
      null,
    email: (empresa.hasOwnProperty('email') && empresa.email) || null,
    telefono: [{ movil: empresa.telefono, fijo: empresa.telefono }],
    quienes_somos: 'somos losotro',
    que_hacemos: 'mucho hacemos'
  };
};

export default (
  state = {
    loading: false,
    error: null,
    data: {},
    success: {}
  },
  action
) => {
  switch (action.type) {
    case actionType.SEND_REGISTER_FORM:
      return { ...state, loading: true };
    case actionType.UPDATE_REGISTER_FORM:
      return { ...state, data: formatDataToSend(action.form) };
    case actionType.SUCCES_REGISTER:
      return { ...state, loading: false, success: action.response };
    case actionType.ERROR_REGISTER:
      return { ...state, loading: false, error: action.error, data: {} };
    default:
      return state;
  }
};
