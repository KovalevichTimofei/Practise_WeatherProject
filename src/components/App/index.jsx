import React, { Component } from 'react';
import Header from '../Header';
import CurrentWeather from '../CurrentWeather';
import Graph from '../Graph';
import FiveDaysWeather from '../FiveDaysWeather';
import Cities from '../Cities';
import Footer from '../Footer';

class App extends Component {

    state = {
        activeCity: {
            city: 'Брест',
            engCity: 'Brest',
            code: 'by'
        }
    };

    key = `${this.state.activeCity.engCity}, ${this.state.activeCity.code}`;

    reRender(){
        let state = this.state;
        this.setState(state);
        alert('reRendering');
    }

    setNewActiveCity(activeCity) {
        this.state.activeCity = activeCity;
        this.setState({
            activeCity: activeCity
        });
    }

    SaveCurrentHistory(currentWeather, key, objectName){
        let storWeather = JSON.parse(window.localStorage.getItem(objectName));
        if (storWeather === null) {
            storWeather = {};
        }
        storWeather[key] = currentWeather;
        window.localStorage.setItem(objectName, JSON.stringify(storWeather));
    }
    SaveHistory(currentWeather,key){
        let flag, now = new Date();

        let storHistoryWeather = JSON.parse(window.localStorage.getItem('currentHistoryWeather'));
        if (storHistoryWeather === null) {
            storHistoryWeather = {};
        }

        let last = storHistoryWeather[key].length - 1;

        if (storHistoryWeather[key]) {
            flag = storHistoryWeather[key][last].date.year === now.getFullYear() &&
                storHistoryWeather[key][last].date.monthNumber === now.getMonth() &&
                storHistoryWeather[key][last].date.day === now.getDate();
        }
        else {
            flag = false;
        }

        if(+currentWeather.date.hour <= 15 || (!flag && now.getHours() > 15)) {
            let storHistoryWeather = JSON.parse(window.localStorage.getItem('currentHistoryWeather'));
            if (storHistoryWeather === null) {
                storHistoryWeather = {};
            }

            if (storHistoryWeather[key]) {

                if(storHistoryWeather[key][last].date.day === now.getDate())
                {
                    alert('Normal!');
                    storHistoryWeather[key].pop();
                    storHistoryWeather[key].push(currentWeather);
                    return;
                }

                if (storHistoryWeather[key].length <= 30) {
                    storHistoryWeather[key].push(currentWeather);
                } else {
                    storHistoryWeather[key].shift();
                    storHistoryWeather[key].push(currentWeather);
                }
            }
            else {
                storHistoryWeather[key] = [];
                storHistoryWeather[key].push(currentWeather);
            }

            window.localStorage.setItem('currentHistoryWeather', JSON.stringify(storHistoryWeather));
        }
    }
    SaveForecastHistory(weather,key){
        let storHistoryWeather = JSON.parse(window.localStorage.getItem('HistoryWeather'));
        if (storHistoryWeather === null) {
            storHistoryWeather = {};
        }

        if(storHistoryWeather[key]) {
            if (storHistoryWeather[key].length <= 30) {
                storHistoryWeather[key].push(weather);
            } else {
                storHistoryWeather[key].shift();
                storHistoryWeather[key].push(weather);
            }
        }
        else{
            storHistoryWeather[key] = [];
            storHistoryWeather[key].push(weather);
        }

        window.localStorage.setItem('HistoryWeather', JSON.stringify(storHistoryWeather));
    }

    onCurrentWeatherLoaded(weather, placeToStore){
        this.SaveCurrentHistory(weather, this.key, placeToStore);
        this.SaveHistory(weather, this.key);
    }

    onForecastLoaded(weather, placeToStore){
        this.SaveCurrentHistory(weather, this.key, placeToStore);
        this.SaveForecastHistory(weather, this.key);
    }

    render() {
        return (
            <div>
                <div className="container">
                <Header/>
                    <section className="row" id='main'>
                        <CurrentWeather activeCity={this.state.activeCity}
                                        onDataLoaded={this.onCurrentWeatherLoaded.bind(this)}/>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <Graph activeCity={this.state.activeCity}/>
                            <FiveDaysWeather activeCity={this.state.activeCity}
                                             onDataLoaded={this.onForecastLoaded.bind(this)}/>
                        </div>
                        <Cities changeCity={this.setNewActiveCity.bind(this)} activeCity={this.state.activeCity}/>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
