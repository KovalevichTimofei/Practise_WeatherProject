import React, { Component } from 'react';
import Header from '../Header';
import CurrentWeather from '../CurrentWeather';
import Graph from '../Graph';
import FiveDaysWeather from '../FiveDaysWeather';
import Cities from '../Cities';
import Footer from '../Footer';
import { connect } from 'react-redux';

class App extends Component {

    state = {
        activeCity: {
            city: 'Брест',
            engCity: 'Brest',
            code: 'by'
        }
    };

    cityID = `${this.state.activeCity.engCity}, ${this.state.activeCity.code}`;

    saveDailyData(currentWeather, key, objectName){
        let storWeather = JSON.parse(window.localStorage.getItem(objectName));
        if (storWeather === null) {
            storWeather = {};
        }
        storWeather[key] = currentWeather;
        window.localStorage.setItem(objectName, JSON.stringify(storWeather));
    }

    saveCurrentHistory(currentWeather,key){
        let flag, now = new Date(), last,
            storHistoryWeather = JSON.parse(window.localStorage.getItem('currentHistoryWeather'));

        if (storHistoryWeather === null) {
            storHistoryWeather = {};
        }

        if(storHistoryWeather[key] && storHistoryWeather[key].length !== 0) {
            last = storHistoryWeather[key].length - 1;
        }else{
            last = 0;
        }

        if (storHistoryWeather[key]) {
            flag = storHistoryWeather[key][last].date.year === now.getFullYear() &&
                storHistoryWeather[key][last].date.monthNumber === now.getMonth() &&
                storHistoryWeather[key][last].date.day === now.getDate();
        } else {
            flag = false;
        }

        if(+currentWeather.date.hour <= 15 || (!flag && now.getHours() > 15)) {
            let storHistoryWeather = JSON.parse(window.localStorage.getItem('currentHistoryWeather'));
            if (storHistoryWeather === null) {
                storHistoryWeather = {};
            }

            if (storHistoryWeather[key]) {

                if(storHistoryWeather[key][last].date.day === now.getDate()) {
                    storHistoryWeather[key].pop();
                    storHistoryWeather[key].push(currentWeather);
                    window.localStorage.setItem('currentHistoryWeather', JSON.stringify(storHistoryWeather));
                    return;
                }

                if (storHistoryWeather[key].length <= 30) {
                    storHistoryWeather[key].push(currentWeather);
                } else {
                    storHistoryWeather[key].shift();
                    storHistoryWeather[key].push(currentWeather);
                }
            } else {
                storHistoryWeather[key] = [];
                storHistoryWeather[key].push(currentWeather);
            }

            window.localStorage.setItem('currentHistoryWeather', JSON.stringify(storHistoryWeather));
        }
    }

    saveForecastHistory(weather, key){
        let storHistoryWeather = JSON.parse(window.localStorage.getItem('HistoryWeather'));

        if (storHistoryWeather === null) {
            storHistoryWeather = {};
        }

        if(storHistoryWeather[key]) {
            let last = storHistoryWeather[key].length - 1,
            now = new Date();
            now.setDate(now.getDate() + 1);
            console.log(storHistoryWeather[key]);
            console.log(storHistoryWeather[key][last]);
            console.log(storHistoryWeather[key][last][0]);
            if(storHistoryWeather[key][last][0].date.dayNumber === now.getDate())
            {
                storHistoryWeather[key].pop();
                storHistoryWeather[key].push(weather);
                window.localStorage.setItem('HistoryWeather', JSON.stringify(storHistoryWeather));
                return;
            }
            if (storHistoryWeather[key].length <= 4) {
                storHistoryWeather[key].push(weather);
            } else {
                storHistoryWeather[key].shift();
                storHistoryWeather[key].push(weather);
            }
        } else{
            storHistoryWeather[key] = [];
            storHistoryWeather[key].push(weather);
        }

        window.localStorage.setItem('HistoryWeather', JSON.stringify(storHistoryWeather));
    }

    onCurrentWeatherLoaded(weather){
        this.saveDailyData(weather, this.cityID, 'currentWeather');
        this.saveCurrentHistory(weather, this.cityID);
    }

    onForecastLoaded(weather){
        console.log(weather);
        this.saveDailyData(weather, this.cityID, 'weather');
        this.saveForecastHistory(weather, this.cityID);
    }

    render() {
        this.cityID = `${this.props.activeCity.engCity}, ${this.props.activeCity.code}`;
        return (
            <div>
                <div className="container">
                <Header/>
                    <section className="row" id='main'>
                        <CurrentWeather onDataLoaded={this.onCurrentWeatherLoaded.bind(this)}/>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <Graph weatherHistory = {JSON.parse(window.localStorage.getItem('currentHistoryWeather'))}/>
                            <FiveDaysWeather onDataLoaded={this.onForecastLoaded.bind(this)}/>
                        </div>
                        <Cities/>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {activeCity : store.activeCity};
};

//export default App;
export default connect(mapStateToProps)(App);