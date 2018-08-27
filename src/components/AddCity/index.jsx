import React from 'react';
import './styles.css';

function AddCity({ openModal }) {
  return (
    <span onClick={openModal} className="glyphicon glyphicon-plus add-city" />
  );
}

export default AddCity;
