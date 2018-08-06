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

    prepareData(props){
        let i, specific;

        for(i = 4; i > 0; i--) {
            let ago = new Date();
            ago.setDate(ago.getDate() - i);

            let ago4;

            if(this.myStorage.getItem('HistoryWeather')) {
                ago4 = JSON.parse(this.myStorage.getItem('HistoryWeather'))[props.cityID];
            }
            else{
                console.log(false);
                this.myStorage.setItem('HistoryWeather', JSON.stringify({}));
                ago4 = [];
            }

            if(JSON.stringify(ago4) === JSON.stringify([]) || ago4 === undefined){
                i = 0;
                break;
            }

            specific = ago4.filter((item) => {
                if (item[0] && item[0].date.dayNumber === ago.getDate()) {
                    return true;
                }
                return false;
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
        } else {
            this.setState({
                weather: {
                    temperature:'Ещё нет в истории погоды',
                    wind:'Ещё нет в истории погоды',
                    pressure:'Ещё нет в истории погоды',
                    cloudness:'Ещё нет в истории погоды',
                    agoNumber: 4
                }
            });
        }
    }

    componentWillMount(){
        this.prepareData(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.prepareData(nextProps);
    }

    render() {
        return(
            <div>
                <strong className="cur-weather-text"> {this.state.weather.agoNumber} дня назад на сегодня обещали: </strong>
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