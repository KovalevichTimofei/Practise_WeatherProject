const CHANGE_CURRENT_WHEATHER = 'CHANGE_CURRENT_WHEATHER';

function changeCurrentWeather({ currentWeather }) {
  return {
    type: CHANGE_CURRENT_WHEATHER,
    currentWeather,
  };
}

export default {
  CHANGE_CURRENT_WHEATHER, changeCurrentWeather,
};
