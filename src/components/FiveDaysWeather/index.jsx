import React, { Component } from 'react';

class FiveDaysWeather extends Component{
    render(){
        return(
            <div id="brest">
            <strong> Прогноз погоды, г. Брест </strong>

            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-7">
                    Среда, 13 июня 2018
                    <img src="http://openweathermap.org/img/w/01d.png"/>
                    <small>Завтра</small>
                </div>
                <div className="col-xs-5 text-right">
                    20°C, <i>Безоблачно</i>
                    <br/>
                    Ветер: 4,71 м/с
                    <br/>
                    Давление: 10001 гПа
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-7">
                    Четверг, 14 июня 2018
                    <img src="http://openweathermap.org/img/w/10d.png"/>
                </div>
                <div className="col-xs-5 text-right">
                    23°C, <i>Небольшой дождь</i>
                    <br/>
                    Ветер: 3,71 м/с
                    <br/>
                    Давление: 10004 гПа
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-7">
                    Пятница, 15 июня 2018
                    <img src="http://openweathermap.org/img/w/10d.png"/>
                </div>
                <div className="col-xs-5 text-right">
                    17°C, <i>Дождь</i>
                    <br/>
                    Ветер: 6,82 м/с
                    <br/>
                    Давление: 10007 гПа
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-7">
                    Суббота, 16 июня 2018
                    <img src="http://openweathermap.org/img/w/10d.png"/>
                </div>
                <div className="col-xs-5 text-right">
                    27°C, <i>Дождь</i>
                    <br/>
                    Ветер: 7,22 м/с
                    <br/>
                    Давление: 10009 гПа
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-7">
                    Воскресенье, 17 июня 2018
                    <img src="http://openweathermap.org/img/w/01d.png"/>
                </div>
                <div className="col-xs-5 text-right">
                    30°C, <i>Безоблачно</i>
                    <br/>
                    Ветер: 5,64 м/с
                    <br/>
                    Давление: 10009 гПа
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"></div>
                </div>
            </div>
        </div>
        );
    }
}

export default FiveDaysWeather;