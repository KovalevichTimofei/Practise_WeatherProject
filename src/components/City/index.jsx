import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function City({ isActive, cityInfo }) {
  const path = '/App/' + cityInfo.engCity;
  return (
    <Link to={path} className="link"><div className={isActive}>{cityInfo.city}</div></Link>
  );
}

export default City;
