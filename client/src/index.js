import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { configure } from 'axios-hooks';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());

const persistor = persistStore(store);

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
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
