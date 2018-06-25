import React, { Component } from 'react';
import './styles.css';

export default class FiveDaysAgo extends Component {

    myStorage = window.localStorage;
    state = {
        weather: {
            temperature:'',
            wind:'',
            pressure:'',
            cloudness:'',
            agoNumber:''
        }
    };

    prepareData(){
        let i, specific;

        for(i = 4; i > 0; i--) {
            let ago = new Date();
            ago.setDate(ago.getDate() - i);

            let ago5 = JSON.parse(this.myStorage.getItem('HistoryWeather'))[this.props.cityKey];
            specific = ago5.filter((item) => {
                if (item[0].date.dayNumber === ago.getDate()) {
                    return true;
                }
            });

            if (specific.length !== 0) break;
        }

        if(i !== 0)
        {
            this.setState({
                weather: {
                    temperature:specific[0][0].temperature,
                    wind:specific[0][0].windSpeed,
                    pressure:specific[0][0].pressure,
                    cloudness:specific[0][0].cloudness,
                    agoNumber: i
                }
            });
        }else{
            this.setState({
                weather: {
                    temperature:'Ещё нет в истории погоды',
                    wind:'Ещё нет в истории погоды',
                    pressure:'Ещё нет в истории погоды',
                    cloudness:'Ещё нет в истории погоды',
                    agoNumber: 5
                }
            });
        }


    }

    componentWillMount(){
        this.prepareData();
    }

    componentWillReceiveProps(nextProps){
        this.prepareData();
    }

    render() {
        return(
            <div>
                <strong className="cur-weather-text"> {this.state.weather.agoNumber} дней назад на сегодня обещали: </strong>
                <strong className="cur-weather-text"> {this.state.weather.temperature}°C </strong>
                <br/>
                <p>
                    <small>
                        Ветер: {this.state.weather.wind}
                        <br/>
                        Давление: {this.state.weather.pressure}
                        <br/>
                        Облачность/осадки: {this.state.weather.cloudness}
                    </small>
                </p>
            </div>);
    }
}