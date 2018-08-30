const CHANGE_FIVE_DAYS_AGO = 'CHANGE_FIVE_DAYS_AGO';

function changeFiveDaysAgoForecast({ weather }) {
  return {
    type: CHANGE_FIVE_DAYS_AGO,
    weather,
  };
}

export default {
  CHANGE_FIVE_DAYS_AGO, changeFiveDaysAgoForecast,
};