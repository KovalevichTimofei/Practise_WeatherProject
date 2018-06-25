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
    };

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

    render() {
        return (
            <div>
                <div className="container">
                <Header/>
                    <section className="row" id='main'>
                        <CurrentWeather activeCity={this.state.activeCity}/>
                        <SpecificCity activeCity={this.state.activeCity} reRender={this.reRender}/>
                        <Cities changeCity={this.setNewActiveCity.bind(this)} activeCity={this.state.activeCity}/>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
