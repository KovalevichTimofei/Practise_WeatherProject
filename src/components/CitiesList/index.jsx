import React, {Component} from 'react';
import City from '../City'

class CitiesList extends Component{

    list = ['Брест','Витебск','Гродно','Гомель','Минск','Могилёв'];

    render(){

        let cities = this.list.map((city, i) =>
        {
            if(i===0)
                return <li><City isActive='active' city={city}/></li>;
            else
                return <li><City isActive='' city={city}/></li>;
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

export default CitiesList;