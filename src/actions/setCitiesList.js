const SET_CITIES_LIST = 'SET';

function setList(list) {
  return {
    type: SET_CITIES_LIST,
    list,
  };
}

export default {
  SET_CITIES_LIST, setList,
};
