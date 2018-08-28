import React from 'react';
import './styles.css';

function AddCity({ openModal }) {
  return (
    <span
      className="glyphicon glyphicon-plus add-city"
      onClick={openModal}
      role="button"
      tabIndex={0}
    />
  );
}

export default AddCity;
