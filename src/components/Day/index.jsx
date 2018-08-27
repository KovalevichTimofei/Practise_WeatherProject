import React, { Fragment } from 'react';

function Day({ weather }) {
  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-12">
          <div className="divider" />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-7">
          {weather.date.dayName}, {weather.date.dayNumber} {weather.date.monthName} {weather.date.year}
          <img alt="иконка" src={weather.icon} />
        </div>
        <div className="col-xs-5 text-right">
          {weather.temperature} °C,
          <i>{weather.cloudness}</i>
          <br />
          Ветер: {weather.windSpeed} м/с
          <br />
          Давление: {weather.pressure} гПа
        </div>
      </div>
    </Fragment>
  );
}

export default Day;
