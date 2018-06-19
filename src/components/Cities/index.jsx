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

    reRender = list => {
        this.state.list = list;
        this.setState({
            list: this.state.list
        });
    };

    render() {
        return(
            <div className="col-xs-3 well">
                <CitiesList list={this.state.list} changeCity={this.props.changeCity} activeCity={this.props.activeCity}/>
                <AddCityModal reRender={this.reRender.bind(this)}/>
            </div>
        );
    }
}

export default Cities;