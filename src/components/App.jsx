import React, { Component } from 'react';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import SpecificCity from './SpecificCity';
import Cities from './Cities';
import Footer from './Footer';

class App extends Component {
    render() {
        return (
            <div>
                <div className="container">
                <Header/>
                    <section className="row" id='main'>
                        <CurrentWeather/>
                        <SpecificCity/>
                        <Cities/>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
