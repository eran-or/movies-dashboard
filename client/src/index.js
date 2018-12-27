import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import AppRouter from './routers/AppRouter'
import * as serviceWorker from './serviceWorker';


const store = configureStore()
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
