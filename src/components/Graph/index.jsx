import React, {Component} from 'react';
import './styles.css';
import 'chartist/dist/chartist.min.css';
import 'chartist/dist/chartist.min';
import ChartistGraph from 'react-chartist';

class Graph extends Component {

    myStorage = window.localStorage;
    data = {
        labels: [],
        series: [[]]
    };
    options = {
        showPoint: true,
        showArea: true,
        lineSmooth: true,
        axisX: {
            showGrid: false,
            showLabel: true
        },
        axisY: {
            offset: 20,
            labelInterpolationFnc: function (value) {
                return value + '°C';
            }
        }
    };
    type = 'Line';


    componentWillMount(){
        this.prepareData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareData(nextProps);
    }

    prepareData(props){
        let cityID = `${props.activeCity.engCity}, ${props.activeCity.code}`,
            weatherHistory = this.props.weatherHistory[cityID];

        if(weatherHistory !== undefined) {
            this.data.labels = weatherHistory.map((item) => `${item.date.day} ${item.date.month}`);
            this.data.series[0] = weatherHistory.map((item) => item.temperature);
            return;
        }

        this.data.labels = [];
        this.data.series[0] = [];
    }

    render() {
        return (
            <div>
                <ChartistGraph data={this.data} options={this.options} type={this.type} />
            </div>
        )
    }
}

export default Graph;