import React, { Component } from 'react';
import Graph from '../Graph';
import FiveDaysWeather from '../FiveDaysWeather';

class SpecificCity extends Component{
    render(){
        return(<div className="col-lg-6 col-md-6 col-sm-6">
            <Graph/>
            <FiveDaysWeather/>
        </div>);
        }
}

export default SpecificCity;