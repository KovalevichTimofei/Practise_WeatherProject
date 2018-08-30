import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrentWeather from '../CurrentWeather';
import Graph from '../Graph';
import FiveDaysWeather from '../FiveDaysWeather';
import Cities from '../Cities';

class App extends Component {
  saveDailyData(currentWeather, key, objectName) {
    let storWeather = JSON.parse(window.localStorage.getItem(objectName));
    if (storWeather === null) {
      storWeather = {};
    }
    storWeather[key] = currentWeather;
    window.localStorage.setItem(objectName, JSON.stringify(storWeather));
  }

  saveCurrentHistory(currentWeather, key) {
    let flag;
    const now = new Date();
    let last;
    let storHistoryWeather = JSON.parse(window.localStorage.getItem('currentHistoryWeather'));

    if (storHistoryWeather === null) {
      storHistoryWeather = {};
    }

    if (storHistoryWeather[key] && storHistoryWeather[key].length !== 0) {
      last = storHistoryWeather[key].length - 1;
    } else {
      last = 0;
    }

    if (storHistoryWeather[key]) {
      flag = storHistoryWeather[key][last].date.year === now.getFullYear()
        && storHistoryWeather[key][last].date.monthNumber === now.getMonth()
        && storHistoryWeather[key][last].date.day === now.getDate();
    } else {
      flag = false;
    }

    if (+currentWeather.date.hour <= 15 || (!flag && now.getHours() > 15)) {
      if (storHistoryWeather === null) {
        storHistoryWeather = {};
      }

      if (storHistoryWeather[key]) {
        if (storHistoryWeather[key][last].date.day === now.getDate()) {
          storHistoryWeather[key].pop();
          storHistoryWeather[key].push(currentWeather);
          window.localStorage.setItem('currentHistoryWeather', JSON.stringify(storHistoryWeather));
          return;
        }

        if (storHistoryWeather[key].length <= 30) {
          storHistoryWeather[key].push(currentWeather);
        } else {
          storHistoryWeather[key].shift();
          storHistoryWeather[key].push(currentWeather);
        }
      } else {
        storHistoryWeather[key] = [];
        storHistoryWeather[key].push(currentWeather);
      }

      window.localStorage.setItem('currentHistoryWeather', JSON.stringify(storHistoryWeather));
    }
  }

  saveForecastHistory(weather, key) {
    let storHistoryWeather = JSON.parse(window.localStorage.getItem('HistoryWeather'));

    if (storHistoryWeather === null) {
      storHistoryWeather = {};
    }

    if (storHistoryWeather[key]) {
      const last = storHistoryWeather[key].length - 1;
      const now = new Date();
      now.setDate(now.getDate() + 1);
      if (storHistoryWeather[key][last][0].date.dayNumber === now.getDate()) {
        storHistoryWeather[key].pop();
        storHistoryWeather[key].push(weather);
        window.localStorage.setItem('HistoryWeather', JSON.stringify(storHistoryWeather));
        return;
      }
      if (storHistoryWeather[key].length <= 4) {
        storHistoryWeather[key].push(weather);
      } else {
        storHistoryWeather[key].shift();
        storHistoryWeather[key].push(weather);
      }
    } else {
      storHistoryWeather[key] = [];
      storHistoryWeather[key].push(weather);
    }

    window.localStorage.setItem('HistoryWeather', JSON.stringify(storHistoryWeather));
  }

  onCurrentWeatherLoaded = (weather) => {
    const { activeCity } = this.props;
    const cityID = `${activeCity.engCity}, ${activeCity.code}`;
    this.saveDailyData(weather, cityID, 'currentWeather');
    this.saveCurrentHistory(weather, this.cityID);
  };

  onForecastLoaded = (weather) => {
    const { activeCity } = this.props;
    const cityID = `${activeCity.engCity}, ${activeCity.code}`;
    this.saveDailyData(weather, cityID, 'weather');
    this.saveForecastHistory(weather, this.cityID);
  };

  render() {
    return (
      <div>
        <div className="container">
          <header>
            <h1>Погода и прогноз</h1>
          </header>
          <section className="row" id="main">
            <CurrentWeather onDataLoaded={this.onCurrentWeatherLoaded} />
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Graph weatherHistory={JSON.parse(window.localStorage.getItem('currentHistoryWeather')) || {}} />
              <FiveDaysWeather onDataLoaded={this.onForecastLoaded} />
            </div>
            <Cities />
          </section>
        </div>
        <footer>
          © 2018 TimofeiWeather ® All rights reserved.
        </footer>
      </div>
    );
  }
}

const mapStateToProps = function ({ activeCityState }) {
  return { activeCity: activeCityState.activeCity };
};

export default connect(mapStateToProps)(App);
