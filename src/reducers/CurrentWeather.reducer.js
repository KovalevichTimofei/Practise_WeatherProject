import changeCurrentWeather from '../actions/newCurrentWeather';

const { CHANGE_CURRENT_WHEATHER } = changeCurrentWeather;

const initialCurrentWeatherState = {
  currentWeather: {
    temperature: '  ',
    date: {
      year: '    ',
      day: '  ',
      month: '  ',
      hour: '',
    },
    wind: {
      speed: ' ',
      gust: ' ',
      direction: ' ',
    },
    cloudness: '  ',
    pressure: '    ',
    humidity: '  ',
    sun: {
      sunrise: ' ',
      sunset: ' ',
    },
    icon: '',
  },
};

const currentWeatherReducer = function (state = initialCurrentWeatherState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_WHEATHER: {
      return Object.assign({}, state, {
        currentWeather: action.currentWeather,
      });
    }
    default: {
      return state;
    }
  }
};

export default currentWeatherReducer;
