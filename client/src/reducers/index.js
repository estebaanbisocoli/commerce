import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import formRegister from './formRegister';
import createStore from 'antd/lib/table/createStore';

export default combineReducers({ form: formReducer, formRegister });
