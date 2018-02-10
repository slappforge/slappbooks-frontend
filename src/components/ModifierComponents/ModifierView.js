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
import {Tab2, Tabs2} from '@blueprintjs/core';
import AddEntityComponent from './AdderComponents/AddEntityComponent';
import AddTransactionComponent from './AdderComponents/AddTransactionComponent';
import ConversionView from './ConversionView/ConversionView';
import ViewEntityComponent from './AdderComponents/ViewEntityComponent';

/**
 * The class is responsible for rendering the Modifier view. A user can modifiy a transaction, entity using this view.
 * It encapsulates @AddEntityComponent and  @AddTransactionComponent
 *
 * @author Malith Jayaweera
 */
class ModifierView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entryCount: 0,
            transactions: [],
            entityList: this.props.entityList,
            amount: [],
            entities: [],
            isCredit: [],
            isCurrencyDifferent: false,
            conversionRate: 0,
            conversionRates: [],
            toCurrency: "USD",
            fromCurrency: "LKR",
            toCurrencies: [],
            fromCurrencies: [],
            amountValue: '',
            updatableTransactions: []
        };
    }

    toggleDialog = () => this.setState({isCurrencyDifferent: !this.state.isCurrencyDifferent});

    handleCurrencyDifference = (isCurrencyDifferent) => {
        this.setState({
            isCurrencyDifferent : isCurrencyDifferent
        })
    };

    handleCloseCallBack = () => {
        this.setState({
            isCurrencyDifferent: false
        })
    };

    handleEntityList = (entities) => {
        this.setState({
            entities: entities
        });
    };

    handleUpdatableTransactions = (transactions) => {
        this.setState({
            updatableTransactions: transactions
        })
    };

    handleAmountCallBack = (amount) => {
        this.setState({
            amount: amount
        })
    };

    handleRefreshCallBack = () => {
        this.props.handleRefreshCallback();
    };

    handleEntityRefreshCallBack = () => {
        this.props.handleEntityRefreshCallback();
    };

    render() {
        return (
            <div>
               <ConversionView handleCloseCallBack={this.handleCloseCallBack}
                               handleRefreshCallback={this.handleRefreshCallBack}
                               fromCurrencies={this.state.fromCurrencies}
                               toCurrencies={this.state.toCurrencies}
                               updatableTransactions={this.state.updatableTransactions}
                               isCurrencyDifferent={this.state.isCurrencyDifferent}
                               entityList={this.state.entities}
                               amount={this.state.amount}/>
                <div className="pt-card pt-elevation-1">
                    <div className={"relativePosition"}>
                        <Tabs2 id="Tabs2Example" onChange={this.handleTabChange}>
                            <Tab2 id="addTransaction" title="Add Transaction" panel={
                                <AddTransactionComponent handleCurrencyDifference={this.handleCurrencyDifference}
                                                         handleEntityCallBack={this.handleEntityList}
                                                         handleUpdatableTransactions={this.handleUpdatableTransactions}
                                                         handleAmountCallBack={this.handleAmountCallBack}
                                                         handleRefreshCallback={this.handleRefreshCallBack}
                                                         entityList={this.props.entityList}
                                                         entryCount={this.props.entryCount}
                                                         entityObjects={this.props.entityObjects}/>
                            }/>
                            <Tab2 id="addEntity" title="Add Entity" panel={
                                <AddEntityComponent handleRefreshCallback={this.handleEntityRefreshCallBack}/>
                            }/>
                            <Tab2 id="viewEntity" title="View Entity" panel={
                                <ViewEntityComponent handleRefreshCallback={this.handleEntityRefreshCallBack} entityObjects={this.props.entityObjects}/>
                            }/>
                        </Tabs2>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModifierView;