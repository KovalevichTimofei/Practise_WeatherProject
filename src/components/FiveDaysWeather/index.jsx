import React, { Component } from 'react';
import Day from '../Day';

class FiveDaysWeather extends Component{

    constructor()
    {
        super();
        this.state = {weather : []};
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
            icon: 'http://openweathermap.org/img/w/01d.png'
        },0,5);
    }

    myStorage = window.localStorage;

    componentWillMount() {
        let storWeather = JSON.parse(this.myStorage.getItem('weather')),
            curDate = new Date();

        curDate.setDate(curDate.getDate() + 1);
        if (storWeather === null || storWeather[0].date.year !== curDate.getFullYear() || storWeather[0].date.monthNumber
            !== curDate.getMonth() || storWeather[0].date.dayNumber !== curDate.getDate() ) {
            let weather = getInformation();
            weather.then((weather) => {
                parseInformation(weather, this);
            });
        }
        else {
            this.setState({weather: storWeather});
        }

        function getInformation() {
            let result;

            return fetch('http://api.openweathermap.org/data/2.5/forecast?q=Brest,by&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru')
                .then(function (response) {
                    return response.json();
                })
                .catch( function(e)
                {
                    alert(e);
                });
        }

        function parseInformation(weather, self){
            let months = ['января','февраля','марта','апреля','мая','июня',
                'июля','августа','сентября','октября','ноября','декабря'];

            let weekDay = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];

            let usefulInformation = weather.list.filter((item) => {
                let date = new Date(item.dt*1000), today = new Date();
                let ifNotToday = date.getDate() !== today.getDate(),
                    if15Hours = date.getHours() === 15;
                return ifNotToday && if15Hours;
            });
            console.log(usefulInformation);
            let resultWeather = usefulInformation.map((item) => {
                let date = new Date(item.dt*1000);

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
                    cloudness: makeFirstLetterUpper(item.weather[0].description),
                    icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
                };
            });

            self.setState({
                weather: resultWeather
            });

            self.myStorage.setItem('weather', JSON.stringify(self.state.weather));

            function makeFirstLetterUpper(word)
            {
                return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
            }
        }
    }

    render(){

        let days = this.state.weather.map((item, i)=>{
            return <Day weather={item}/>;
        });
        return(
            <div>
            <strong> Прогноз погоды, г. Брест </strong>
                {days}
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"/>
                </div>
            </div>
        </div>
        );
    }
}

export default FiveDaysWeather;