/*
 * Copyright (c) 2018 SLAppForge Lanka (Private) Limited. All Rights Reserved.
 * https://www.slappforge.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react';
import View from 'react-flexbox';
import {EditableText} from '@blueprintjs/core';

/**
 *  The class is renders the conversion view body. A user will use this view to convert transaction values from one
 *  currency to another currency
 *
 *  @author Malith Jayaweera
 */
class ConversionViewBody  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entities: this.props.entities,
            toCurrencies: this.props.toCurrencies,
            fromCurrencies: this.props.fromCurrencies,
            conversionRates: this.props.conversionRates,
            amount: this.props.amount,
            updatableTransactions: this.props.updatableTransactions
        }
    }

    handleToCurrency = (index, e) => {
        console.log(this.props.toCurrencies);
        let toCurrencies = this.props.toCurrencies.slice();
        toCurrencies[index] = e.target.value;
        this.props.handleToCurrencies(toCurrencies);
    };

    handleFromCurrency = (index, e) => {
        let fromCurrencies = this.props.fromCurrencies.slice();
        fromCurrencies[index] = e.target.value;
        this.props.handleFromCurrencies(fromCurrencies);
    };


    render(){
        let content = [];
        this.props.entities.forEach((entity, index) => {
            content.push(
                <div key={index}>
                    <form>
                        <View column>
                            <View style={{
                                flexDirection: 'row-inverse',
                                padding: 0.2,
                                alignItems: 'stretch',
                                justifyContent: 'left'
                            }}>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="entityValue">
                                        Entity
                                        <div className="pt-input pt-inline">
                                            <EditableText disabled={true} value={entity}/>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="fromCurrency">
                                        From Currency
                                        <div className="pt-select pt-inline">
                                            <select ref="fromCurrency" defaultValue="LKR" name="fromCurrency"
                                                    onChange={event => this.handleFromCurrency(index, event)}>
                                                <option value="LKR">LKR</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="toCurrency">
                                        To Currency
                                        <div className="pt-select pt-inline">
                                            <select ref="toCurrency" defaultValue="USD" name="toCurrency"
                                                    onChange={event => this.handleToCurrency(index, event)}>
                                                <option value="LKR">LKR</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="spotRate">
                                        Conversion Rate
                                        <div className="pt-input pt-inline">
                                            <EditableText value={this.props.conversionRates[index]}/>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="value">
                                        Value
                                        <div className="pt-input pt-inline">
                                            <EditableText disabled={true}
                                                          value={this.props.amount[index] * this.props.conversionRates[index]}/>
                                        </div>
                                    </label>
                                </View>
                            </View>
                        </View>
                    </form>
                </div>);
        });

        return(
            <div>
                {content}
            </div>
        );
    }
}

export default ConversionViewBody;