import React, { Component } from 'react';
import Day from '../Day';

class FiveDaysWeather extends Component{

    state

    componentWillMount() {
        //let curWeather = JSON.parse(this.myStorage.getItem('currentWeather')),
            //curDate = new Date();



            let weather = getInformation();
            weather.then((weather) => {
                //console.log(weather);
                //parseInformation(weather, this);
            });

        function getInformation() {
            let result;

            return fetch('http://api.openweathermap.org/data/2.5/forecast?q=Brest,by&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru')
                .then(function (response) {
                    return response.json();
                })
                .then(function(res){
                    console.log(res);
                    return res;
                })
                .catch( function(e)
                {
                    alert(e);
                });
        }
    }

    daysList = [
        {
            date: {
                dayName: 'Среда',
                dayNumber: 13,
                monthName: 'июня',
                year: 2018
            },
            temperature: 20,
            windSpeed: 4.71,
            pressure: 10001,
            cloudness: 'Безоблачно',
            icon: 'http://openweathermap.org/img/w/01d.png'
        },
        {
            date: {
                dayName: 'Четверг',
                dayNumber: 14,
                monthName: 'июня',
                year: 2018
            },
            temperature: 23,
            windSpeed: 3.71,
            pressure: 10004,
            cloudness: 'Небольшой дождь',
            icon: 'http://openweathermap.org/img/w/10d.png'
        },
        {
            date: {
                dayName: 'Пятница',
                dayNumber: 15,
                monthName: 'июня',
                year: 2018
            },
            temperature: 17,
            windSpeed: 6.82,
            pressure: 10007,
            cloudness: 'Дождь',
            icon: 'http://openweathermap.org/img/w/10d.png'
        },
        {
            date: {
                dayName: 'Суббота',
                dayNumber: 16,
                monthName: 'июня',
                year: 2018
            },
            temperature: 27,
            windSpeed: 7.22,
            pressure: 10009,
            cloudness: 'Дождь',
            icon: 'http://openweathermap.org/img/w/10d.png'
        },
        {
            date: {
                dayName: 'Воскресенье',
                dayNumber: 17,
                monthName: 'июня',
                year: 2018
            },
            temperature: 30,
            windSpeed: 5.64,
            pressure: 10009,
            cloudness: 'Безоблачно',
            icon: 'http://openweathermap.org/img/w/01d.png'
        }
    ];

    render(){

        let days = this.daysList.map((item, i)=>{
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