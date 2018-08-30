const CHANGE_FIVE_DAY_WHEATHER = 'CHANGE_FIVE_DAY_WHEATHER';

function changeFiveDayWeather(weather) {
  return {
    type: CHANGE_FIVE_DAY_WHEATHER,
    weather,
  };
}

export default {
  CHANGE_FIVE_DAY_WHEATHER, changeFiveDayWeather,
};
