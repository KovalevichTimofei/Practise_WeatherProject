import setCitiesList from '../actions/setCitiesList';

const { SET_CITIES_LIST } = setCitiesList;

const initialListState = { list: [] };

const citiesReducer = function (state = initialListState, action) {
  switch (action.type) {
    case SET_CITIES_LIST: {
      return Object.assign({}, state, {
        list: action.list,
      });
    }
    default: {
      return state;
    }
  }
};

export default citiesReducer;
