import React from 'react';
import './App.css';
import Combination from "./components/Combination";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            combinations : []

        };
    }

    componentDidMount = () =>{
        axios.get("/api/home")
            .then((result) => {
                console.log(result);
                this.setState({combinations: result.data});
            });
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
