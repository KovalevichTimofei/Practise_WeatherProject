import React, {Component} from 'react';
import CitiesList from '../CitiesList';
import AddCity from '../AddCity';

class Cities extends Component{
    render(){
        return(
            <div className="col-xs-3 well">
                <CitiesList/>
                <AddCity/>
            </div>
        );
    }
}

export default Cities;