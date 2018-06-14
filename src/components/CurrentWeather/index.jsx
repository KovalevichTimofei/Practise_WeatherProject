import React, { Component } from 'react';
import './styles.css';

class CurrentWeather extends Component {
    render(){
        return(
            <div className="col-lg-3 col-md-3 col-sm-3">
                <strong className="cur-weather-text"> Погода в Бресте </strong>
                <img src="http://openweathermap.org/img/w/03d.png"/>
                <strong className="cur-weather-text"> 25°C </strong>
                12 июня, 2018
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                    Ветер
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    Скорость - 6 m/s, порывы - 9 m/s, направление - Зюйд
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                    Облачность
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    Переменная
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                    Давление
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    1024 гПа
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                    Влажность
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    80%
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                    Восход Солнца
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    9:16
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                    Закат Солнца
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 align-text">
                    17:58
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="divider"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentWeather;