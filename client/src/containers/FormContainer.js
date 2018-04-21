import React, { Component } from 'react';
import { connect } from 'react-redux';

import { notification } from 'antd';
import { WizardForm } from '../components/register-form';
import controllers from '../controllers';
import actions from '../actions';

function mapStateToProps({ formRegister }) {
  return {
    loading: formRegister.loading,
    error: formRegister.error,
    data: formRegister.data,
    success: formRegister.success
  };
}

const updateForm = form => {
  return dispatch => dispatch({ type: actions.UPDATE_REGISTER_FORM, form });
};

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submited: false
    };
  }

  componentWillReceiveProps({ data, dispatch }, prevProps) {
    if (
      JSON.stringify(data) !== JSON.stringify(this.props.data) &&
      !(Object.keys(data).length === 0 && data.constructor === Object)
    ) {
      dispatch({ type: actions.SEND_REGISTER_FORM });
      return controllers
        .sendData(data)
        .then(response => {
          if (!response.data.success) {
            notification.open({
              duration: 0,
              message: 'Registro Fallido',
              description: JSON.stringify(response.data.error, undefined, 2)
            });
            dispatch({
              type: actions.ERROR_REGISTER,
              error: response.data.error
            });
          } else {
            notification.open({
              duration: 0,
              message: 'Registro Exitoso',
              description: JSON.stringify(response.data, undefined, 2)
            });
            dispatch({
              type: actions.SUCCES_REGISTER,
              response: response.data
            });
          }
        })

        .catch(error => {
          const errorMessage = error.response.data.error;
          notification.open({
            duration: 0,
            message: 'Registro Fallido',
            description: JSON.stringify(errorMessage, undefined, 2)
          });
          dispatch({ type: actions.ERROR_REGISTER, error: errorMessage });
        });
    }
  }
  onSubmit(form) {
    this.props.dispatch(updateForm(form));
  }
  render() {
    return (
      <WizardForm
        loading={this.props.loading}
        onSubmit={this.onSubmit.bind(this)}
      />
    );
  }
}

export default connect(mapStateToProps)(FormContainer);
