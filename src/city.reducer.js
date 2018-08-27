import changeCity from './actions/changeCity';

const { CHANGE } = changeCity;

const initialActiveCityState = {
  activeCity: {
    city: 'Брест',
    code: 'by',
    engCity: 'Brest',
  },
};

const activeCityReducer = function (state = initialActiveCityState, action) {
  switch (action.type) {
    case CHANGE: {
      return {
        activeCity: action.activeCity,
      };
    }
    default: {
      return state;
    }
  }
};

export default activeCityReducer;
