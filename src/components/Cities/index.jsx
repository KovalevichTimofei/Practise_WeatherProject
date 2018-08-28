import React, { Component } from 'react';
import CitiesList from '../CitiesList';
import AddCityModal from '../AddCityModal';

class Cities extends Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
  }

  getInformation({ engCity, code  }) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${engCity},${code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`)
      .then(response => response.status)
      .catch((e) => {
        alert(e);
      });
  }

  componentWillMount() {
    //  this.myStorage.removeItem('citiesList');
    let list = JSON.parse(this.myStorage.getItem('citiesList'));
    if (list === null) {
      list = [];
    }
    this.setState({
      list,
    });
  }

  add = () => {

    const info = {
      city: document.getElementById('City').value,
      code: document.getElementById('Code').value,
      engCity: document.getElementById('EngCity').value,
    };

    const { engCity, code  } = info;

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${engCity},${code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`)
      .then(response => response.status)
      .then(status =>
      {
        if (status === 404)
        {
          return false;
        }
        let list = JSON.parse(this.myStorage.getItem('citiesList'));

        if (list === null || list === undefined) {
          list = [];
        }

        list.push(info);

        this.myStorage.setItem('citiesList', JSON.stringify(list));
        this.setState({
          list,
        });

        return true;
      })
      .catch((e) => false
      );
  };

  render() {
    const { list } = this.state;
    return (
      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 well">
        <CitiesList list={list} />
        <AddCityModal add={this.add} />
      </div>
    );
  }
}

export default Cities;
