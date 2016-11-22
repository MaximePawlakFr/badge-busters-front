import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import env from './env';
// let API_ENDPOINT = "http://localhost:8888/api/profiles";
// let API_ENDPOINT = "http://localhost:8888/api/profiles";

ReactDOM.render(
  <App url={ env.API_ENDPOINT }/>,
  document.getElementById('root')
);
