import React, { Component } from 'react';
import { connect } from 'react-redux';
import newFiveDaysAgoForecast from '../../actions/newFiveDaysAgoForecast';

class FiveDaysAgo extends Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
  }

  componentDidMount() {
    this.prepareData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { weather, cityID } = this.props;
    if (JSON.stringify(weather) !== JSON.stringify(nextProps.weather)
        || cityID !== nextProps.cityID) {
      this.prepareData(nextProps);
    }
  }

  prepareData(props) {
    const { dispatch, cityID } = props;
    let i;
    let specific;

    for (i = 4; i > 0; i--) {
      const ago = new Date();
      ago.setDate(ago.getDate() - i);

      let ago4;

      if (this.myStorage.getItem('HistoryWeather')) {
        ago4 = JSON.parse(this.myStorage.getItem('HistoryWeather'))[cityID];
      } else {
        this.myStorage.setItem('HistoryWeather', JSON.stringify({}));
        ago4 = [];
      }

      if (JSON.stringify(ago4) === JSON.stringify([]) || ago4 === undefined) {
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

    if (i !== 0) {
      dispatch(newFiveDaysAgoForecast.changeFiveDaysAgoForecast({
        weather: {
          temperature: specific[0][0].temperature,
          wind: specific[0][0].windSpeed,
          pressure: specific[0][0].pressure,
          cloudness: specific[0][0].cloudness,
          agoNumber: i,
        },
      }));
    } else {
      dispatch(newFiveDaysAgoForecast.changeFiveDaysAgoForecast({
        weather: {
          temperature: 'Ещё нет в истории погоды',
          wind: 'Ещё нет в истории погоды',
          pressure: 'Ещё нет в истории погоды',
          cloudness: 'Ещё нет в истории погоды',
          agoNumber: 4,
        },
      }));
    }
  }

  render() {
    const { weather } = this.props;
    return (
      <div>
        <strong className="cur-weather-text"> {weather.agoNumber} дня назад на сегодня обещали:
        </strong>
        <strong className="cur-weather-text"> {weather.temperature}
          °C
        </strong>
        <br />
        <p>
          <small>
            Ветер: {weather.wind}
            <br />
            Давление: {weather.pressure}
            <br />
            Облачность/осадки: {weather.cloudness}
          </small>
        </p>
      </div>);
  }
}

const mapStateToProps = function ({ fiveDaysAgoState }) {
  return {
    weather: fiveDaysAgoState.weather,
  };
};

export default connect(mapStateToProps)(FiveDaysAgo);
