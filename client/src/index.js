import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { configure } from 'axios-hooks';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const instance = axios.create({
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})
    
configure({ instance });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();