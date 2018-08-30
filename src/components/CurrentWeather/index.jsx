import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import d2d from 'degrees-to-direction';
import FiveDaysAgo from '../FiveDaysAgo';
import newCurrentWeather from '../../actions/newCurrentWeather';

class CurrentWeather extends Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.cityID = 'Brest, by';
  }

  componentDidMount() {
    this.prepareData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { currentWeather, activeCity } = this.props;
    this.cityID = `${activeCity.engCity}, ${activeCity.code}`;
    if (JSON.stringify(currentWeather) !== JSON.stringify(nextProps.currentWeather)
    || JSON.stringify(activeCity) !== JSON.stringify(nextProps.activeCity)) {
      this.prepareData(nextProps);
    }
  }

  getInformation(props) {
    const info = props.activeCity;
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${info.engCity},${info.code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`)
      .then(response => response.json())
      .catch((e) => {
        alert(e);
      });
  }

  getWindDirection(degree) {
    if (degree === undefined) {
      return 'Неизвестно';
    }
    const dir = d2d(degree);

    const values = {
      E: 'ост',
      N: 'норд',
      S: 'зюйд',
      W: 'вест',
    };
    const result = dir.split('').map(item => values[item]);
    result[0] = this.makeFirstLetterUpper(result[0]);
    return result.join('-');
  }

  addZero(n) {
    return n.toString().length === 1 ? `0${n}` : n.toString();
  }

  parseInformation(weather, { onDataLoaded, dispatch }) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const date = new Date(weather.dt * 1000);
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);

    const currentWeather = {
      temperature: Math.round(weather.main.temp - 273.15),
      date: {
        year: date.getFullYear(),
        day: date.getDate(),
        month: months[date.getMonth()],
        monthNumber: date.getMonth(),
        hour: (new Date()).getHours(),
      },
      wind: {
        speed: weather.wind.speed,
        gust: weather.wind.gust,
        direction: this.getWindDirection(weather.wind.deg),
      },
      cloudness: this.makeFirstLetterUpper(weather.weather[0].description),
      pressure: weather.main.pressure,
      humidity: weather.main.humidity,
      sun: {
        sunrise: `${this.addZero(sunrise.getHours())}:${this.addZero(sunrise.getMinutes())}`,
        sunset: `${this.addZero(sunset.getHours())}:${this.addZero(sunset.getMinutes())}`,
      },
      icon: weather.weather[0].icon,
    };
    dispatch(newCurrentWeather.changeCurrentWeather({ currentWeather }));
    onDataLoaded(currentWeather);
  }

  shouldRequestServer(currentWeather, cur) {
    let ifDataIsNotToday = true;
    let ifDataIsNotActual = true;
    const curDate = cur || new Date();

    if (currentWeather !== undefined) {
      ifDataIsNotToday = currentWeather.date.year < curDate.getFullYear() || currentWeather.date.monthNumber
        < curDate.getMonth() || currentWeather.date.day < curDate.getDate();

      ifDataIsNotActual = currentWeather.date.hour < curDate.getHours() && curDate.getHours() <= 15;
    }
    return ifDataIsNotToday || ifDataIsNotActual;
  }

  prepareData(props) {
    //  this.myStorage.removeItem('currentWeather');
    const { dispatch, activeCity } = props;
    let currentWeather = JSON.parse(this.myStorage.getItem('currentWeather'));

    currentWeather = currentWeather === null ? undefined : currentWeather[this.cityID];

    if (this.shouldRequestServer(currentWeather)) {
      const weather = this.getInformation(props);
      weather.then((information) => {
        this.parseInformation(information, props);
      });
    } else {
      dispatch(newCurrentWeather.changeCurrentWeather({ currentWeather }));
    }
  }

  makeFirstLetterUpper(word) {
    return word === undefined || word === null ? undefined : `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  render() {
    const { activeCity, currentWeather } = this.props;
    const imgUrl = +currentWeather.icon === +''
      ? 'https://openweathermap.org/img/w/01d.png'
      : `https://openweathermap.org/img/w/${currentWeather.icon}.png`;
    return (
      <div className="col-lg-3 col-md-3 col-sm-3">
        <strong className="cur-weather-text">
            Погода в г. {activeCity.city}
        </strong>
        <img alt="иконка" src={imgUrl} />
        <strong className="cur-weather-text">
          {currentWeather.temperature}
          °C
        </strong>
        {currentWeather.date.day} {currentWeather.date.month}, {currentWeather.date.year}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            Ветер
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    Скорость - {currentWeather.wind.speed} м/с,
                    порывы - {currentWeather.wind.gust} м/с,
                    направление - {currentWeather.wind.direction}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
                    Облачность
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 align-text">
            {currentWeather.cloudness}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
                    Давление
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 align-text">
            {currentWeather.pressure} гПа
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
                    Влажность
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 align-text">
            {currentWeather.humidity}%
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
                    Восход Солнца
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 align-text">
            {currentWeather.sun.sunrise}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
                    Закат Солнца
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 align-text">
            {currentWeather.sun.sunset}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
        <FiveDaysAgo cityID={this.cityID} />
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="divider" />
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = function ({ activeCityState, currentWeatherState }) {
  return {
    activeCity: activeCityState.activeCity,
    currentWeather: currentWeatherState.currentWeather,
    cityInfo: currentWeatherState.cityInfo,
  };
};

export default connect(mapStateToProps)(CurrentWeather);
