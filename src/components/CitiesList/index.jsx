import React, { Component } from 'react';
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
      if (`${city.engCity}, ${city.code}` === `${activeCity.engCity}, ${activeCity.code}`) {
        return <li key={index++}><City isActive="active" cityInfo={city} /></li>;
      }
      return <li key={index++} onClick={this.changeCity.bind(this, city)}><City isActive="" cityInfo={city} /></li>;
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

const mapStateToProps = function (store) {
  return { activeCity: store.activeCity };
};

export default connect(mapStateToProps)(CitiesList);
