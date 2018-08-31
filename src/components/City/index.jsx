import React from 'react';
import './styles.css';

function City({ cityInfo }) {
  return (
    <div>{cityInfo.city}</div>
  );
}

export default City;
