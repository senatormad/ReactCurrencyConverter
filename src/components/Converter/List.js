import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import {colourStyles} from "./Converter.select.styles"
import settingsPic from './images/settings.png'
import closePic from './images/close.png'



class List extends Component{


    state = {
        result: null,
        currencies: [],
        selectValue: {'value' : 1, 'label' : "HRK"},
        selectedCurr: ['USD', 'EUR', 'HUF', 'GBP', 'CZK', 'HRK', 'RON', 'RUB', 'JPY', 'BGN', 'CHF', 'AUD' ],
        defaultCurr: ['USD', 'EUR', 'HUF', 'GBP', 'CZK', 'HRK', 'RON', 'RUB', 'JPY', 'BGN', 'CHF', 'AUD' ],
        showPicker: false

    }



    componentDidMount()
    {
        this.setState({loading: true})
        this.getValue(this.state.selectValue.label)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectValue !== this.state.selectValue) {
            this.getValue(this.state.selectValue.label)
        }

    }

    getValue(fromCurrency) {
        fetch("https://api.exchangeratesapi.io/latest?base=" + fromCurrency)
            .then(response => response.json())
            .then(data => {
                const currencyAr = []

                for (const key in data.rates) {
                    currencyAr.push({ 'value' : data.rates[key], 'label' : key })
                }
                if(fromCurrency === "EUR"){
                    currencyAr.push({ 'value' : 1, 'label' : 'EUR' })
                }
                this.setState({
                    currencies: currencyAr,
                })
            })
            .catch(err => {
                console.log("Opps", err.message)
            })
    }

    changeCurrList(event) {
        const valueSwapper = this.state.selectedCurr
        if(event.target.checked){
            valueSwapper.push(event.target.value)
            this.setState({selectedCurr : valueSwapper} )

        } else {
            console.log(event.target.value)
            this.valueSwapper = valueSwapper.filter(item => item !== event.target.value)
            console.log(valueSwapper)
            this.setState({ selectedCurr: this.valueSwapper })
        }

    }

    showPicker() {
        const currentState = this.state.showPicker;
        this.setState({ showPicker: !currentState });

    }

    clearPicker(){
        this.setState({ selectedCurr: [] });
    }

    allPicker(){
        const allCurr = []
        for(let i=0; i<this.state.currencies.length; i++){
            allCurr.push(this.state.currencies[i].label)
        }
        this.setState({ selectedCurr: allCurr });
    }

    defaultPicker(){
        this.setState({ selectedCurr: this.state.defaultCurr });
        console.log(this.state.selectedCurr)
    }


    render()
    {
        return (
            <div className={"col-12 List position-relative"}>
                <h2>List</h2>
                <div className={"selectList col-4"}>
                    <Fragment>
                        <Select
                            value={this.state.selectValue}
                            styles={colourStyles}
                            onChange={value => {this.setState({selectValue: value })}}
                            options={this.state.currencies}
                        />
                    </Fragment>
                </div>
                <div className={'printedList'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <h4>{"1 " + this.state.selectValue.label}</h4>
                        </div>

                        {this.state.currencies.map((rate, i) => (
                            this.state.selectedCurr.includes(rate.label) && <div className={'col-6'} key={i}><p key={i}>{rate.value.toFixed(5) + " " + rate.label}</p></div>
                            /*<div className={'col-6'} key={i}><p key={i}>{rate.label + " - " + rate.value.toFixed(5)}</p></div>*/
                        ))}
                    </div>
                </div>
                <div className={"settingButton"}>
                    <img
                        src={settingsPic} alt={"Add/Remove Currencies"}
                        onClick={this.showPicker.bind(this)}
                    />
                </div>
                <div className={this.state.showPicker ? "currPicker fadeIn" : "currPicker fadeOut"}>
                    <div
                        className={"closePicker"}
                    >
                        <img
                            src={closePic} alt={"Close"}
                            onClick={this.showPicker.bind(this)}
                        />
                    </div>
                    <div className={"row"}>
                        {this.state.currencies.map((rate, i) => (
                            <div key={i} className={"col-3 d-block pt-1 pb-2"}>
                                <div key={i} className="checkbox-container">
                                    <label key={i} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            value={rate.label}
                                            key={i}
                                            onChange={this.changeCurrList.bind(this)}
                                            checked={this.state.selectedCurr.includes(rate.label)}
                                        />
                                        <span className="checkbox-custom rectangular"></span>
                                    </label>
                                    <div className="input-title">{rate.label}</div>
                                </div>
                            </div>
                        ))}
                        <div className={"col-12"}>
                            <p
                                onClick={this.allPicker.bind(this)}
                            >
                                Select All
                            </p>
                            <p
                                onClick={this.defaultPicker.bind(this)}
                            >
                                Default
                            </p>
                            <p
                                className={"clearAll"}
                                onClick={this.clearPicker.bind(this)}
                            >
                                Clear All
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default List