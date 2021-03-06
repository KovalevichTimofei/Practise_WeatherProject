import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './components/App';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import cityReducer from './reducers/city.reducer';
import './index.css';

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
  routing: routerReducer,
});

const store = createStore(reducers);
const browserHistory = createHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Fragment>
        <Route exact path="/" component={Login} />
        <Route path="/App" component={App} />
      </Fragment>
    </Router>
  </Provider>, document.getElementById('root'),
);
