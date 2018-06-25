import React, { Component } from 'react';
import './styles.css';
import d2d from 'degrees-to-direction';
import FiveDaysAgo from '../FiveDaysAgo';

class CurrentWeather extends Component {

    state = {
        currentWeather: {
            temperature: '  ',
            date: {
                year: '    ',
                day: '  ',
                month: '  ',
                hour: ''
            },
            wind: {
                speed: ' ',
                gust: ' ',
                direction: ' '
            },
            cloudness: '  ',
            pressure: '    ',
            humidity: '  ',
            sun: {
                sunrise: ' ',
                sunset: ' '
            },
            icon: ''
        },
        cityInfo: {
            city: '',
            engCity: '',
            code: ''
        }
    };

    myStorage = window.localStorage;
    key = 'Brest, by';

    prepareData(props) {
        this.myStorage.removeItem('currentWeather');
        this.key = `${props.activeCity.engCity}, ${props.activeCity.code}`;
        let currentWeather = JSON.parse(this.myStorage.getItem('currentWeather')),
            curDate = new Date(),
            ifDataIsNotToday = true,
            ifDataIsNotActual = true;

        currentWeather = currentWeather === null ? undefined : currentWeather[this.key];

        if( currentWeather !== undefined ) {
            ifDataIsNotToday = currentWeather.date.year !== curDate.getFullYear() || currentWeather.date.monthNumber
                !== curDate.getMonth() || currentWeather.date.day !== curDate.getDate(),
                ifDataIsNotActual = currentWeather.date.hour !== curDate.getHours() && curDate.getHours() <= 15;
        }

        if (ifDataIsNotToday || ifDataIsNotActual) {

            let weather = this.getInformation(props);
            weather.then((weather) => {
                this.parseInformation(weather, props);
            });
        } else {
            this.setState({currentWeather: currentWeather, cityInfo: props.activeCity});
        }
    }

    getInformation(props) {
        let result;
        let info = props.activeCity;
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${info.engCity},${info.code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`)
            .then(function (response) {
                return response.json();
            }).catch( function(e)
            {
                alert(e);
            });
    };

    parseInformation(weather, props) {
        let months = ['января','февраля','марта','апреля','мая','июня',
            'июля','августа','сентября','октября','ноября','декабря'];

        let date = new Date(weather.dt*1000),
            sunrise = new Date (weather.sys.sunrise*1000),
            sunset = new Date (weather.sys.sunset*1000);

        this.setState({
            currentWeather: {
                temperature: Math.round(weather.main.temp - 273.15),
                date: {
                    year: date.getFullYear(),
                    day: date.getDate(),
                    month: months[date.getMonth()],
                    monthNumber: date.getMonth(),
                    hour: date.getHours()
                },
                wind: {
                    speed: weather.wind.speed,
                    gust: weather.wind.gust,
                    direction: this.getWindDirection(weather.wind.deg)
                },
                cloudness: this.makeFirstLetterUpper(weather.weather[0].description),
                pressure: weather.main.pressure,
                humidity: weather.main.humidity,
                sun: {
                    sunrise: `${this.addZero(sunrise.getHours())}:${this.addZero(sunrise.getMinutes())}`,
                    sunset: `${this.addZero(sunset.getHours())}:${this.addZero(sunset.getMinutes())}`
                },
                icon: weather.weather[0].icon
            },
            cityInfo: props.activeCity
        });

        this.props.onDataLoaded(this.state.currentWeather, 'currentWeather');
    };

    addZero(n) {
        return n.toString().length === 1 ? `0${n}` : n;
    };

    getWindDirection(degree) {
        let dir = d2d(degree);

        let values = {
            'E' : 'ост',
            'N' : 'норд',
            'S' : 'зюйд',
            'W' : 'вест'
        };
        let result = dir.split('').map( (item) => values[item] );
        result[0] = this.makeFirstLetterUpper(result[0]);
        return result.join('-');
    };

    makeFirstLetterUpper(word) {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    };

    componentWillMount() {
        this.prepareData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareData(nextProps);
    }

    render() {
        let imgUrl = `http://openweathermap.org/img/w/${this.state.currentWeather.icon}.png`;
        return <div className="col-lg-3 col-md-3 col-sm-3">
            <strong className="cur-weather-text"> Погода в г. {this.state.cityInfo.city}  </strong>
            <img src={imgUrl}/>
            <strong className="cur-weather-text"> {this.state.currentWeather.temperature}°C </strong>
            {this.state.currentWeather.date.day} {this.state.currentWeather.date.month}, {this.state.currentWeather.date.year}
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    Ветер
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    Скорость - {this.state.currentWeather.wind.speed} м/с,
                    порывы - {this.state.currentWeather.wind.gust} м/с,
                    направление - {this.state.currentWeather.wind.direction}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    Облачность
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    {this.state.currentWeather.cloudness}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    Давление
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    {this.state.currentWeather.pressure} гПа
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    Влажность
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    {this.state.currentWeather.humidity}%
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    Восход Солнца
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    {this.state.currentWeather.sun.sunrise}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    Закат Солнца
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    {this.state.currentWeather.sun.sunset}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
            <FiveDaysAgo cityKey={this.key}/>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="divider"/>
                </div>
            </div>
        </div>;
    }
}

export default CurrentWeather;