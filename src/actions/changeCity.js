const CHANGE = 'CHANGE';

function changeCity(city) {
  return {
    type: CHANGE,
    activeCity: city,
  };
}

export default {
  CHANGE, changeCity,
}