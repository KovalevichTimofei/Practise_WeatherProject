import React, {Component, Fragment} from 'react';

class Day extends Component {
    render() {
        return(
            <Fragment>
            <div className="row">
                <div className="col-xs-12">
                    <div className="divider"/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-7">
                    {this.props.weather.date.dayName}, {this.props.weather.date.dayNumber} {this.props.weather.date.monthName} {this.props.weather.date.year}
                    <img src={this.props.weather.icon}/>
                </div>
                <div className="col-xs-5 text-right">
                    {this.props.weather.temperature}°C, <i>{this.props.weather.cloudness}</i>
                    <br/>
                    Ветер: {this.props.weather.windSpeed} м/с
                    <br/>
                    Давление: {this.props.weather.pressure} гПа
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Day;