import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fir : null,
            sec : null,
            thi : null,
            fou : null,
            fif : null,
            six : null,
            username: null
        };
    }

    componentDidMount() {
        // fetch('test')
        //     .then(res => res.json())
        //     .then(data => this.setState({username: data.username}));
        fetch('home')
            .then(res => res.json())
            .then(data => this.setState({
                fir : data.fir,
                sec : data.sec,
                thi : data.thi,
                fou : data.fou,
                fif : data.fif,
                six : data.six,
                username: data.username
            }));
    }

    render() {
        const {username} = this.state;
        const {fir} = this.state;
        const {sec} = this.state;
        const {thi} = this.state;
        const {fou} = this.state;
        const {fif} = this.state;
        const {six} = this.state;
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/*    {username ? `Hello ${username}` : 'Hello World'}*/}
                {/*</header>*/}
                <header className="App-header">
                    {fir ? `Hello ${fir} ` : 'Hello World'}
                    {sec ? `Hello ${sec} ` : 'Hello World'}
                    {thi ? `Hello ${thi} ` : 'Hello World'}
                    {fou ? `Hello ${fou} ` : 'Hello World'}
                    {fif ? `Hello ${fif} ` : 'Hello World'}
                    {six ? `Hello ${six} ` : 'Hello World'}
                </header>
            </div>
        );
    }
}

export default App;
