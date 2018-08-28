import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from '../Day';

class FiveDaysWeather extends Component {

  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.state = { weather: [], cityInfo: {} };
    this.state.weather.fill({
      date: {
        dayName: '',
        dayNumber: '',
        monthNumber: '',
        monthName: '',
        year: '',
      },
      temperature: '',
      windSpeed: '',
      pressure: '',
      cloudness: '',
      icon: 'https://openweathermap.org/img/w/01d.png'
    }, 0, 5);
  }

  componentDidMount() {
    this.prepareData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareData(nextProps);
  }

  getInformation(props) {
    const info = props.activeCity;

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${info.engCity},${info.code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`)
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
      this.setState({
        weather: storWeather,
        cityInfo: props.activeCity,
      });
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
    this.setState({
      weather: resultWeather,
      cityInfo: props.activeCity,
    });

    const { onDataLoaded } = this.props;
    onDataLoaded(resultWeather);
  }

  makeFirstLetterUpper(word) {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  render() {
    const { weather, cityInfo } = this.state;
    let index = 0;
    const days = weather.map(item => <Day key={index++} weather={item} />);

    return (
      <div>
        <strong>
          Прогноз погоды, г. {cityInfo.city}
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

const mapStateToProps = function ({ activeCityState }) {
  return { activeCity: activeCityState.activeCity };
};

export default connect(mapStateToProps)(FiveDaysWeather);
