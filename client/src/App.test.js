import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import CONFIG from './config';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('connect success api LOCAL URL', async () => {
  try {
    const response = await axios.get(CONFIG.API_LOCAL_V1);
    if (response.data.success) {
      return;
    }
  } catch (error) {
    throw new Error(error);
  }
});
