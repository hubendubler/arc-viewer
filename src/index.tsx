import React from 'react';
import ReactDOM from 'react-dom';
import './translations/i18n';
import {App} from './App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.querySelector('#root'),
);
