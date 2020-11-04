import React from 'react';
import '../csses/Combination.css';
import Number from "./Number";

class Combination extends React.Component {
    render() {
        const numbers = [];
        numbers.push(<Number number = {this.props.combination.fir}/>);
        numbers.push(<Number number = {this.props.combination.sec}/>);
        numbers.push(<Number number = {this.props.combination.thi}/>);
        numbers.push(<Number number = {this.props.combination.fou}/>);
        numbers.push(<Number number = {this.props.combination.fif}/>);
        numbers.push(<Number number = {this.props.combination.six}/>);
        return (
            <div className="App">
                {numbers}
            </div>
        );
    }
}

export default Combination;
