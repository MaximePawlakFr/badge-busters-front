import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

// let API_ENDPOINT = "http://localhost:8888/api/profiles";
let API_ENDPOINT = "http://badgebusters.simplon.xyz/api/profiles";

ReactDOM.render(
  <App url={ API_ENDPOINT }/>,
  document.getElementById('root')
);
