import React from 'react';
import './App.css';
import Combination from "./components/Combination";
const serverUrl = "http://localhost:3001";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            combinations : []

        };
    }

    componentDidMount() {
        fetch(serverUrl+"/api/home")
            .then(res => res.json())
            .then(data => {
                    this.setState({
                        combinations: data
                    })
                }
            );
    }

    render() {
        const combinations = (this.state.combinations).map(e => <Combination combination = {e}/>);
        return (
            <div className="App">
                {combinations}
            </div>
        );
    }
}

export default App;
