import changeFiveDaysForecast from '../actions/newFiveDaysForecast';

const { CHANGE_FIVE_DAY_WHEATHER } = changeFiveDaysForecast;

const initialFiveDaysWeatherState = { weather: [] };

const currentFiveDaysWeatherReducer = function (state = initialFiveDaysWeatherState, action) {
  if (state.weather.length === 1) {
    state.weather.fill({
      date: {
        dayName: '',
        dayNumber: '',
        monthNumber: '',
        monthName: '',
        year: '',
      },
      temperature: '',
      windSpeed: '',
      pressure: '',
      cloudness: '',
      icon: 'https://openweathermap.org/img/w/01d.png',
    }, 0, 5);
  }
  switch (action.type) {
    case CHANGE_FIVE_DAY_WHEATHER: {
      return Object.assign({}, state, {
        weather: action.weather,
      });
    }
    default: {
      return state;
    }
  }
};

export default currentFiveDaysWeatherReducer;
