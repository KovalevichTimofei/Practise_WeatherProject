import React, { Component } from 'react';
import Day from '../Day';
import { connect } from 'react-redux';

class FiveDaysWeather extends Component {

    constructor() {
        super();
        this.state = {weather : [], cityInfo: {}};
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
        },0,5);
    }

    myStorage = window.localStorage;

    prepareData(props) {
        //this.myStorage.removeItem('weather');
        let storWeather = JSON.parse(this.myStorage.getItem('weather')),
            curDate = new Date(),
            cityID = `${props.activeCity.engCity}, ${props.activeCity.code}`,
            ifDataIsNotToday = true;
        storWeather = storWeather === null ? undefined : storWeather[cityID];
        curDate.setDate(curDate.getDate() + 1);

        if( JSON.stringify(storWeather) != JSON.stringify([]) ) {
            ifDataIsNotToday = storWeather[0].date.year !== curDate.getFullYear() || storWeather[0].date.monthNumber
                !== curDate.getMonth() || storWeather[0].date.dayNumber !== curDate.getDate();
        }

        if ( ifDataIsNotToday ) {
            let weather = this.getInformation(props);
            console.log(fetch);
            console.log(weather);
            weather.then((weather) => {
                this.parseInformation(weather, props);
            });
        } else {
            this.setState({weather: storWeather,
                           cityInfo: props.activeCity});
        }
    }

    getInformation(props) {
        let info = props.activeCity;

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${info.engCity},${info.code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`)
            .then(function (response) {
                return response.json();
            }).catch( function(e)
            {
                alert(e);
            });
    }

    parseInformation(weather, props) {
        console.log(weather);
        let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        let weekDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        let usefulInformation = weather.list.filter((item) => {
            let date = new Date(item.dt * 1000), today = new Date();
            let ifNotToday = date.getDate() !== today.getDate(),
                if15Hours = date.getHours() === 15;
            return ifNotToday && if15Hours;
        });

        let resultWeather = usefulInformation.map((item) => {
            let date = new Date(item.dt * 1000);

            return {
                date: {
                    dayName: weekDay[date.getDay()],
                    dayNumber: date.getDate(),
                    monthNumber: date.getMonth(),
                    monthName: months[date.getMonth()],
                    year: date.getFullYear()
                },
                temperature: Math.round(item.main.temp - 273.15),
                windSpeed: item.wind.speed,
                pressure: item.main.pressure,
                cloudness: this.makeFirstLetterUpper(item.weather[0].description),
                icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`
            };
        });
        console.log(resultWeather);
        this.setState({
            weather: resultWeather,
            cityInfo: props.activeCity
        });

        this.props.onDataLoaded(this.state.weather);
    };

    makeFirstLetterUpper(word) {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    }

    componentWillMount() {
        this.prepareData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareData(nextProps);
    }

    render() {
        let days = this.state.weather.map((item, i) => {
            return <Day key={i} weather={item}/>;
        });

        return(
            <div>
            <strong> Прогноз погоды, г. {this.state.cityInfo.city} </strong>
                {days}
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"/>
                </div>
            </div>
                <div hidden>
                    Not important text
                </div>
        </div>
        );
    }
};

const mapStateToProps = function(store) {
    return {activeCity : store.activeCity};
};

export default connect(mapStateToProps)(FiveDaysWeather);