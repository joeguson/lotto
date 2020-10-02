import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null
        };
    }

    componentDidMount() {
        fetch('test')
            .then(res=>res.json())
            .then(data=>this.setState({username:data.username}));
    }

    render() {
        const {username} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    {username ? `Hello ${username}` : 'Hello World'}
                </header>
            </div>
        );
    }
}

export default App;
