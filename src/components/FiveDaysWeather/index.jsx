import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from '../Day';
import changeFiveDaysForecast from '../../actions/newFiveDaysForecast';
import getWeatherForCity from '../../services/fiveDaysWeatherFetch';

class FiveDaysWeather extends Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
  }

  componentDidMount() {
    this.prepareData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { weather, activeCity } = this.props;
    if (JSON.stringify(weather) !== JSON.stringify(nextProps.weather)
      || JSON.stringify(activeCity) !== JSON.stringify(nextProps.activeCity)) {
      this.prepareData(nextProps);
    }
  }

  getInformation(props) {
    const info = props.activeCity;

    return getWeatherForCity(info.engCity, info.code)
      .then(response => response.json())
      .catch((e) => {
        alert(e);
      });
  }

  prepareData(props) {
    //  this.myStorage.removeItem('weather');
    let storWeather = JSON.parse(this.myStorage.getItem('weather'));
    const curDate = new Date();
    const cityID = `${props.activeCity.engCity}, ${props.activeCity.code}`;
    let ifDataIsNotToday = true;
    storWeather = storWeather === null ? undefined : storWeather[cityID];
    curDate.setDate(curDate.getDate() + 1);

    if (JSON.stringify(storWeather) !== JSON.stringify([]) && storWeather !== undefined) {
      ifDataIsNotToday = storWeather[0].date.year !== curDate.getFullYear() || storWeather[0].date.monthNumber
        !== curDate.getMonth() || storWeather[0].date.dayNumber !== curDate.getDate();
    }

    if (ifDataIsNotToday) {
      const weather = this.getInformation(props);
      weather.then((information) => {
        this.parseInformation(information, props);
      });
    } else {
      props.dispatch(changeFiveDaysForecast.changeFiveDayWeather(storWeather));
    }
  }

  parseInformation(weather, props) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const weekDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const usefulInformation = weather.list.filter((item) => {
      const date = new Date(item.dt * 1000);
      const today = new Date();
      const ifNotToday = date.getDate() !== today.getDate();
      const if15Hours = date.getHours() === 15;
      return ifNotToday && if15Hours;
    });

    const resultWeather = usefulInformation.map((item) => {
      const date = new Date(item.dt * 1000);

      return {
        date: {
          dayName: weekDay[date.getDay()],
          dayNumber: date.getDate(),
          monthNumber: date.getMonth(),
          monthName: months[date.getMonth()],
          year: date.getFullYear(),
        },
        temperature: Math.round(item.main.temp - 273.15),
        windSpeed: item.wind.speed,
        pressure: item.main.pressure,
        cloudness: this.makeFirstLetterUpper(item.weather[0].description),
        icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
      };
    });
    props.dispatch(changeFiveDaysForecast.changeFiveDayWeather(resultWeather));

    const { onDataLoaded } = props;
    onDataLoaded(resultWeather);
  }

  makeFirstLetterUpper(word) {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  render() {
    const { weather, activeCity } = this.props;
    let index = 0;
    const days = weather.map(item => <Day key={index++} weather={item} />);

    return (
      <div>
        <strong>
          Прогноз погоды, г. {activeCity.city}
        </strong>
        {days}
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
        <div hidden>
          Not important text
        </div>
      </div>
    );
  }
}

const mapStateToProps = function ({ activeCityState, fiveDaysWeatherState }) {
  return {
    activeCity: activeCityState.activeCity,
    weather: fiveDaysWeatherState.weather,
  };
};

export default connect(mapStateToProps)(FiveDaysWeather);
