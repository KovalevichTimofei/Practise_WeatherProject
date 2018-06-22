import React, {Component, Fragment} from 'react';
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
        let key = `${props.activeCity.engCity}, ${props.activeCity.code}`,
            weatherHistory = JSON.parse(this.myStorage.getItem('currentHistoryWeather'))[key];

        this.data.labels = weatherHistory.map((item) => `${item.date.day} ${item.date.month}`);
        this.data.series[0] = weatherHistory.map((item) => item.temperature);
    }

    render() {
        let data = {
            labels: ['21', '22', '23', '24', '25', '26'],
            series: [
                [30, 15, 16, 17, 18, 14]
            ]
        };

        return (
            <div>
                <ChartistGraph data={this.data} options={this.options} type={this.type} />
            </div>
        )
    }
}

export default Graph;