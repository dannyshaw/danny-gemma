import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './containers/App';

ReactDOM.render(
  <App

    rsvpEmail={window.dannygemma.rsvpEmail}
  />,
  document.getElementById('app')
);
