import React, { Component } from 'react';
import './styles.css';
import 'chartist/dist/chartist.min.css';
import 'chartist/dist/chartist.min';
import ChartistGraph from 'react-chartist';
import { connect } from 'react-redux';

class Graph extends Component {
  constructor() {
    super();
    this.data = {
      labels: [],
      series: [[]],
    };
    this.options = {
      showPoint: true,
      showArea: true,
      lineSmooth: true,
      axisX: {
        showGrid: false,
        showLabel: true,
      },
      axisY: {
        offset: 20,
        labelInterpolationFnc: value => `${value} °C`,
      },
    };
    this.type = 'Line';
  }


  componentWillMount() {
    this.prepareData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareData(nextProps);
  }

  prepareData(props) {
    const { weatherHistory: fullWeatherHistory } = this.props;
    const cityID = `${props.activeCity.engCity}, ${props.activeCity.code}`;
    const weatherHistory = fullWeatherHistory[cityID];

    if (weatherHistory !== undefined) {
      this.data.labels = weatherHistory.map(item => `${item.date.day} ${item.date.month}`);
      this.data.series[0] = weatherHistory.map(item => item.temperature);
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
    );
  }
}

const mapStateToProps = function (store) {
  return { activeCity: store.activeCity };
};

export default connect(mapStateToProps)(Graph);
