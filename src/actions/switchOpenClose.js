const SWITCH = 'SWITCH';

function switchState(modalIsOpen) {
  return {
    type: SWITCH,
    modalIsOpen,
  };
}

export default {
  SWITCH, switchState,
};
