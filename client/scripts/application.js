import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './containers/App';
// import '../semantic'
import '../semantic/semantic.less'

ReactDOM.render(
  <App
    rsvpEmail={window.dannygemma.rsvpEmail}
  />,
  document.getElementById('app')
);
