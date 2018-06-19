import React, {Component} from 'react';
import CitiesList from '../CitiesList';
import AddCityModal from '../AddCityModal';

class Cities extends Component {

    myStorage = window.localStorage;

    componentWillMount() {
        //this.myStorage.removeItem('citiesList');
        let list = JSON.parse(this.myStorage.getItem('citiesList'));
        if(list === null) {
            list = [];
        }
        this.setState({
            list: list
        });
    }

    add() {
        let list = JSON.parse(this.myStorage.getItem('citiesList'));

        if (list === null || list === undefined) {
            list = [];
        }

        list.push({
            city: document.getElementById('City').value,
            code: document.getElementById('Code').value,
            engCity: document.getElementById('EngCity').value
        });

        this.myStorage.setItem('citiesList', JSON.stringify(list));
        this.setState({
            list: list
        });
    }

    render() {
        return(
            <div className="col-xs-3 well">
                <CitiesList list={this.state.list} changeCity={this.props.changeCity} activeCity={this.props.activeCity}/>
                <AddCityModal add={this.add.bind(this)}/>
            </div>
        );
    }
}

export default Cities;