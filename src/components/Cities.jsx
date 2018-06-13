import React, {Component} from 'react';
import CitiesList from './CitiesList';
import AddCity from './AddCity';

class Cities extends Component{
    render(){
        return(
            <div className="col-xs-3">
                <div className="well">
                    <ul className="nav">
                        <li className="nav">Города для просмотра</li>
                        <li className="nav-divider"></li>
                        <li className="active"><a href="#brest">Брест</a></li>
                        <li><a href="#vitebsk">Витебск</a></li>
                        <li><a href="#grodno">Гродно</a></li>
                        <li><a href="#gomel">Гомель</a></li>
                        <li><a href="#minsk">Минск</a></li>
                        <li><a href="#mogiliov">Могилёв</a></li>
                        <li className="nav-divider"></li>
                        <li><span className="glyphicon glyphicon-plus"></span></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Cities;