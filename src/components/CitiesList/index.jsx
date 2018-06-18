import React, {Component} from 'react';
import City from '../City'

class CitiesList extends Component{

    list = [{city : 'Брест', code : 'by'}];

    componentWillMount(){
        //alert(JSON.stringify(this.props.list));
        let newList = this.props.list.filter((item)=>{
            return this.list.every((val)=>{
                //alert('val: ' + JSON.stringify(val) + ' item: ' + JSON.stringify(item));
                return !(val.city === item.city && val.code === item.code);
            })
        });
        //alert(JSON.stringify(newList));
        this.list = this.list.concat(newList);
    }

    render(){
        //alert(JSON.stringify(this.list));
        let newList = this.props.list.filter((item)=>{
            return this.list.every((val)=>{
                //alert('val: ' + JSON.stringify(val) + ' item: ' + JSON.stringify(item));
                return !(val.city === item.city && val.code === item.code);
            })
        });
        this.list = this.list.concat(newList);

        let cities = this.list.map((city, i) =>
        {
            if(i===0)
                return <li><City isActive='active' city={city.city}/></li>;
            else
                return <li><City isActive='' city={city.city}/></li>;
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