import React, { Component } from 'react';
import Header from '../Header';
import CurrentWeather from '../CurrentWeather';
import SpecificCity from '../SpecificCity';
import Cities from '../Cities';
import Footer from '../Footer';

class App extends Component {

    state = {
        activeCity: {
            city: 'Брест',
            engCity: 'Brest',
            code: 'by'
        }
        /*activeCity: {
            city: 'Гродно',
            engCity: 'Hrodna',
            code: 'by'
        }*/
    };

    setNewActiveCity(activeCity){
        this.state.activeCity = activeCity;
        this.setState({
            activeCity: activeCity
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                <Header/>
                    <section className="row" id='main'>
                        <CurrentWeather activeCity={this.state.activeCity}/>
                        <SpecificCity activeCity={this.state.activeCity}/>
                        <Cities changeCity={this.setNewActiveCity.bind(this)} activeCity={this.state.activeCity}/>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
