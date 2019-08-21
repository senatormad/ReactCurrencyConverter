import React, { Component } from 'react';
import Converter from './components/Converter/Converter';
import List from './components/Converter/List';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



class App extends Component {

    render() {
        return (
            <div className={"converterBox"}>
                <div className={"row"}>
                    <div className={'col-12 titleDiv'}>
                        <h1>Curency Converter</h1>
                    </div>
                </div>
                <div className={"row"}>
                    <Converter />
                    <List />
                </div>

            </div>
        );
    }
}

export default App
