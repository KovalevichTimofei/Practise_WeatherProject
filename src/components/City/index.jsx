import React, {Component} from 'react';
import './styles.css';

class City extends Component{
    render(){
        return(
            <a className={this.props.isActive}>{this.props.cityInfo.city}</a>
        );
    }
}

export default City;