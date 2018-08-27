import React from 'react';
import './styles.css';

function City({ isActive, cityInfo }) {
  return (
    <a className={isActive}>{cityInfo.city}</a>
  );
}

export default City;
