import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import City from '../City';
import change from '../../actions/changeCity';

class CitiesList extends Component {
  constructor() {
    super();
    this.list = [{ city: 'Брест', code: 'by', engCity: 'Brest' }];
  }

  componentWillMount() {
    const { list } = this.props;
    const newList = list.filter(
      item => this.list.every(
        val => !(val.city === item.city && val.code === item.code),
      ),
    );
    this.list = this.list.concat(newList);
  }

  changeCity(city) {
    const { dispatch } = this.props;
    dispatch(change.changeCity(city));
  }

  render() {
    const { activeCity, list } = this.props;
    const newList = list.filter(
      item => this.list.every(
        val => !(val.city === item.city && val.code === item.code
        ),
      ),
    );

    this.list = this.list.concat(newList);
    this.list = this.list.filter(item => item.city !== '');

    let index = 0;

    const cities = this.list.map((city) => {
      let path = '/cities/' + city.engCity;
      if (city.engCity === 'Brest') path = '/';
      if (`${city.engCity}, ${city.code}` === `${activeCity.engCity}, ${activeCity.code}`) {
        return (
          <li key={index++}>
            <Link to={path} className="active">
              <City cityInfo={city} />
            </Link>
          </li>
        );
      }
      return (
        <li key={index++} onClick={this.changeCity.bind(this, city)}>
          <Link to={path} className="">
            <City cityInfo={city} />
          </Link>
        </li>
      );
    });

    return (
      <ul className="nav">
        <li className="nav">Города для просмотра</li>
        <li className="nav-divider" />
        {cities}
        <li className="nav-divider" />
      </ul>
    );
  }
}

const mapStateToProps = function ({ activeCityState }) {
  return { activeCity: activeCityState.activeCity };
};

export default connect(mapStateToProps)(CitiesList);
