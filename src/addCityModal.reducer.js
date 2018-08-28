import switchOpenClose from './actions/switchOpenClose';

const { SWITCH } = switchOpenClose;

const initialAddCityModalState = {
  modalIsOpen: false,
};

const switchOpenCloseReducer = function (state = initialAddCityModalState, action) {
  switch (action.type) {
    case SWITCH: {
      return {
        modalIsOpen: !action.modalIsOpen,
      };
    }
    default: {
      return state;
    }
  }
};

export default switchOpenCloseReducer;
