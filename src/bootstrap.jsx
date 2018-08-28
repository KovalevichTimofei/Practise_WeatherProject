import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import cityReducer from './city.reducer';
import addCityModalReducer from './addCityModal.reducer';

const reducers = combineReducers({
  activeCityState: cityReducer,
  addCityModalState: addCityModalReducer,
});

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
