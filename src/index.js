import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
document.documentElement.style.fontSize=document.documentElement.clientWidth/10+'px'; 
// console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <App />
    </HashRouter>
    </Provider>,
        document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
