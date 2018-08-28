import React, { Component } from 'react';
import CitiesList from '../CitiesList';
import AddCityModal from '../AddCityModal';

class Cities extends Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
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
    let list = JSON.parse(this.myStorage.getItem('citiesList'));

    if (list === null || list === undefined) {
      list = [];
    }

    list.push({
      city: document.getElementById('City').value,
      code: document.getElementById('Code').value,
      engCity: document.getElementById('EngCity').value,
    });

    this.myStorage.setItem('citiesList', JSON.stringify(list));
    this.setState({
      list,
    });
  };

  render() {
    const { list } = this.state;
    return (
      <div className="col-xs-3 well">
        <CitiesList list={list} />
        <AddCityModal add={this.add} />
      </div>
    );
  }
}

export default Cities;
