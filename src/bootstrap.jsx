import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import cityReducer from './city.reducer';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

let store = createStore(cityReducer);

ReactDOM.render(<Provider store={store}>
                        <App />
                </Provider>, document.getElementById('root'));
