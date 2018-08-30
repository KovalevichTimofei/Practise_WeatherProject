import changeFiveDaysAgoForecast from '../actions/newFiveDaysAgoForecast';

const { CHANGE_FIVE_DAYS_AGO } = changeFiveDaysAgoForecast;

const initialFiveDaysAgoForecastState = {
  weather: {
    temperature: 'Ещё нет в истории погоды',
    wind: 'Ещё нет в истории погоды',
    pressure: 'Ещё нет в истории погоды',
    cloudness: 'Ещё нет в истории погоды',
    agoNumber: 4,
  },
};

const fiveDaysAgoReducer = function (state = initialFiveDaysAgoForecastState, action) {
  switch (action.type) {
    case CHANGE_FIVE_DAYS_AGO: {
      return Object.assign({}, state, {
        weather: action.weather,
      });
    }
    default: {
      return state;
    }
  }
};

export default fiveDaysAgoReducer;
