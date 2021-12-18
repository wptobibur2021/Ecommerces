import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import {store, persistor} from "./Redux/store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
            <ToastContainer />
          <App />
        </Router>
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);