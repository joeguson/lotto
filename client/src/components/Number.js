import React from 'react';
import '../csses/Number.css';

class Number extends React.Component {
    render() {
        return (
            <span className="Number">
                {this.props.number}
            </span>
        );
    }
}

export default Number;
