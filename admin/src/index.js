import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store, persistor} from "./Redux/store"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ToastContainer/>
            <App/>
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);
