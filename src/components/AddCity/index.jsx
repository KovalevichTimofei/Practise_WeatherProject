import React, {Component} from 'react';
import './styles.css'

class AddCity extends Component{
    render(){
        return(
            <span onClick={this.props.openModal} className="glyphicon glyphicon-plus add-city"></span>
        );
    }
}

export default AddCity;