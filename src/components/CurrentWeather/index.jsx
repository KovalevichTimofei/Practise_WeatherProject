import React, { Component } from 'react';
import './styles.css';
import d2d from 'degrees-to-direction';

class CurrentWeather extends Component {

    state = {
        currentWeather: {
            temperature: '  ',
            date: {
                year: '    ',
                day: '  ',
                month: '  '
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
            }
        }
    };

    myStorage = window.localStorage;

    componentWillMount() {
        let curWeather = JSON.parse(this.myStorage.getItem('currentWeather')),
            curDate = new Date();

        if (curWeather === null || curWeather.date.year !== curDate.getFullYear() || curWeather.date.monthNumber
            !== curDate.getMonth() || curWeather.date.day !== curDate.getDate() ) {

            let weather = getInformation();
            weather.then((weather) => {
                //console.log(weather);
                parseInformation(weather, this);
            });
        }
        else {
            this.setState({curWeather});
        }

        function getInformation() {
            let result;

            return fetch('http://api.openweathermap.org/data/2.5/weather?q=Brest,by&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru')
                .then(function (response) {
                    return response.json();
                })
                .catch( function(e)
                {
                    alert(e);
                });
        }

        function parseInformation(weather, self){
            console.log(weather);
            let months = ['января','февраля','марта','апреля','мая','июня',
                'июля','августа','сентября','октября','ноября','декабря'];

            let date = new Date(weather.dt*1000),
                sunrise = new Date (weather.sys.sunrise*1000),
                sunset = new Date (weather.sys.sunset*1000);

            self.setState({
                currentWeather: {
                    temperature: weather.main.temp - 273.15,
                    date: {
                        year: date.getFullYear(),
                        day: date.getDate(),
                        month: months[date.getMonth()],
                        monthNumber: date.getMonth()
                    },
                    wind: {
                        speed: weather.wind.speed,
                        gust: weather.wind.gust,
                        direction: getWindDirection(weather.wind.deg)
                    },
                    cloudness: makeFirstLeteerUpper(weather.weather[0].description),
                    pressure: weather.main.pressure,
                    humidity: weather.main.humidity,
                    sun: {
                        sunrise: `${addZero(sunrise.getHours())}:${addZero(sunrise.getMinutes())}`,
                        sunset: `${addZero(sunset.getHours())}:${addZero(sunset.getMinutes())}`
                    }
                }
            });

            self.myStorage.setItem('currentWeather', JSON.stringify(self.state.currentWeather))
            console.log(self.myStorage);

            function addZero(n){
                return n.toString().length === 1 ? `0${n}` : n;
            }

            function getWindDirection(degree)
            {
                let dir = d2d(degree);

                let values = {
                    'E' : 'ост',
                    'N' : 'норд',
                    'S' : 'зюйд',
                    'W' : 'вест'
                };

                let result = dir.split('').map( (item) => values[item] );
                result[0] = makeFirstLeteerUpper(result[1]);
                return result.join('-');
            }

            function makeFirstLeteerUpper(word)
            {
                return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
            }
        }
    }

    render(){
        return <div className="col-lg-3 col-md-3 col-sm-3">
            <strong className="cur-weather-text"> Погода в Бресте </strong>
            <img src="http://openweathermap.org/img/w/03d.png"/>
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
        </div>;
    }
}

export default CurrentWeather;