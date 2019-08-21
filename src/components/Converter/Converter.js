import React, { Component, Fragment } from 'react';
import Select from 'react-select'
import {colourStyles} from "./Converter.select.styles";

class Converter extends Component{


    state = {
        result: null,
        fromCurrency: {'value' : "", 'label' : "HRK"},
        toCurrency: {'value' : "", 'label' : "EUR"},
        amount: 1,
        currencies: [],
        rates: [],
    };

    componentDidMount()
    {
        this.setState({loading: true})
        fetch("https://api.exchangeratesapi.io/latest?base=" + this.state.fromCurrency.label)
            .then(response => response.json())
            .then(data => {
                const currencyAr = []
                const ratesAr = []

                for (const key in data.rates) {
                    currencyAr.push({ 'value' : data.rates[key], 'label' : key })
                    ratesAr.push( key + " - " + data.rates[key] )

                }
                this.setState({
                    currencies: currencyAr,
                    rates: ratesAr,
                })
            })
            .catch(err => {
                console.log("Opps", err.message);
            });


    }

    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            fetch("https://api.exchangeratesapi.io/latest?base=" + this.state.fromCurrency.label + "&symbols=" + this.state.toCurrency.label)
                .then(response => response.json())
                .then(data => {
                    const result = this.state.amount * (data.rates[this.state.toCurrency.label]);
                    this.setState({ result: result.toFixed(5) })
                })
                .catch(err => {
                    console.log("Opps", err.message);
                });
        } else {
            this.setState({result: "You cant convert the same currency!"})
        }
    };

    selectHandler = (event, option) => {
        if (option.name === "from") {
            this.setState({fromCurrency: event})
        }
        if (option.name === "to") {
            this.setState({toCurrency: event})
        }
    }

    render()
    {

        return (
            <div className={"col-12 Converter"}>
                <h2>Converter</h2>
                <div className="Form row m-0 pt-4 pb-3">
                    <div className={"col-8"}>
                        <input
                            name="amount"
                            value={this.state.amount}
                            type="number"
                            onChange={event =>
                                this.setState({amount: event.target.value})
                            }
                        />
                        <input
                            name="amount"
                            value={this.state.result ? this.state.result : "0.00"}
                            style={{backgroundColor: "white", color: "#800000"}}
                            type="number"
                            onChange={event =>
                                this.setState({amount: event.target.value})
                            }
                            disabled={true}
                        />
                    </div>
                    <div className={"col-4"}>
                        <Fragment>
                            <div className={"row"}>
                                <div className={"col-12 selectMargin"}>
                                    <Select
                                        name="from"
                                        styles={colourStyles}
                                        value={this.state.fromCurrency}
                                        options={this.state.currencies}
                                        onChange={(event, option) => this.selectHandler(event, option)}
                                    />
                                </div>
                                <div className={"col-12 selectMargin"}>
                                    <Select
                                        name="to"
                                        styles={colourStyles}
                                        value={this.state.toCurrency}
                                        options={this.state.currencies}
                                        onChange={(event, option) => this.selectHandler(event, option)}
                                    />
                                </div>
                            </div>
                        </Fragment>
                    </div>
                    <button
                        onClick={this.convertHandler}
                    >Convert</button>
                </div>

            </div>
        );
    }
}

export default Converter