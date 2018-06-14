import React, {Component} from 'react';

class CitiesList extends Component{
    render(){
        return(
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
            </ul>
        );
    }
}

export default CitiesList;