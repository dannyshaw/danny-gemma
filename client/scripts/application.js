import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './containers/App';
import '../semantic/semantic.less'
const mount = document.getElementById('app');

ReactDOM.render(<App rsvpEmail={window.dannygemma.rsvpEmail} />, mount);
