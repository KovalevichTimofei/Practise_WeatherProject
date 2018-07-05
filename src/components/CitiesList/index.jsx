import React, {Component} from 'react';
import City from '../City'
import { connect } from 'react-redux';
import change from '../../actions/changeCity'

class CitiesList extends Component {

    list = [{city : 'Брест', code : 'by', engCity : 'Brest'}];

    componentWillMount() {
        let newList = this.props.list.filter((item) => {
            return this.list.every((val) => {
                return !(val.city === item.city && val.code === item.code);
            })
        });
        this.list = this.list.concat(newList);
    }

    changeCity(city) {
        this.props.dispatch(change.changeCity(city));
    }

    render() {
        let newList = this.props.list.filter( (item) => {
            return this.list.every((val) => {
                return !(val.city === item.city && val.code === item.code);
            })
        });

        this.list = this.list.concat(newList);

        this.list = this.list.filter( (item) => {
            return item.city !== '';
        });

        let cities = this.list.map((city, i) => {
            if (`${city.engCity}, ${city.code}` === `${this.props.activeCity.engCity}, ${this.props.activeCity.code}`) {
                return <li key={i}><City isActive='active' cityInfo={city}/></li>;
            } else {
                return <li key={i} onClick={this.changeCity.bind(this, city)}><City isActive='' cityInfo={city}/></li>;
            }
        });

        return(
            <ul className="nav">
                <li className="nav">Города для просмотра</li>
                <li className="nav-divider"></li>
                {cities}
                <li className="nav-divider"></li>
            </ul>
        );
    }
}

const mapStateToProps = function(store) {
    return {activeCity : store.activeCity};
};

export default connect(mapStateToProps)(CitiesList);