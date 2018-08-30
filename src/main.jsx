import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import cityReducer from './reducers/city.reducer';
import addCityModalReducer from './reducers/addCityModal.reducer';
import currentWeatherReducer from './reducers/CurrentWeather.reducer';
import fiveDaysAgoReducer from './reducers/FiveDaysAgo.reducer';
import fiveDaysWeatherReducer from './reducers/FiveDaysWeather.reducer';
import setCitiesListReducer from './reducers/Cities.reducer';

const reducers = combineReducers({
  activeCityState: cityReducer,
  addCityModalState: addCityModalReducer,
  currentWeatherState: currentWeatherReducer,
  fiveDaysAgoState: fiveDaysAgoReducer,
  fiveDaysWeatherState: fiveDaysWeatherReducer,
  setCitiesListState: setCitiesListReducer,
});

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
