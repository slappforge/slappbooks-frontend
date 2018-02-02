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
import md5 from 'md5';
import moment from 'moment';
import {Intent, Position, Toaster} from '@blueprintjs/core';
import TransactionBasicRow from '../../TransactionView/TransactionRowView/TransactionBasicRow';
import TransactionFullRow from '../../TransactionView/TransactionRowView/TransactionFullRow';
import Transaction from '../../../models/Transaction';
import transactionService from '../../../services/TransactionService';


/**
 *  The class is responsible for rendering the Add Transaction view. A user can add a transaction using this view.
 *  It encapsulates @AddTransactionComponent
 *
 *  @author Malith Jayaweera
 */
class AddTransactionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entityList : this.props.entityList,
            entryCount : 0,
            entityObjects : this.props.entityObjects,
            entities: [],
            amount: ''
        }
    }

    handleRefreshCallBack = () => {
        this.props.handleRefreshCallback();
    };

    submitForm = (e) => {
        e.preventDefault();
        let date = e.target.date.value;
        let notes = e.target.notes.value;
        let cheque = e.target.cheque.value;
        let voucher = e.target.voucher.value;
        let count = e.target.amount.length === undefined ? 1 : e.target.amount.length;
        let amount = [];
        let entity = [];
        let credit = [];
        let transactions = [];
        let creditAmounts = 0;
        let debitAmounts = 0;
        let isCurrencyDifferent;
        let currencies = [];

        if (count !== null && count < 2) {
            OurToaster.show({message: "A minimum of two entries should be present per transaction"});
            return;
        }

        for (let i = 0; i < count; i++) {
            amount.push(e.target.amount[i].value !== "" ? e.target.amount[i].value : 0);
            entity.push(e.target.entity[i].value);
            credit.push(e.target.doubleEntry[i].value === "CR");
            if (e.target.doubleEntry[i].value === "CR") {
                creditAmounts += +amount[i];
            } else {
                debitAmounts += +amount[i];
            }
        }

        if (creditAmounts === debitAmounts && creditAmounts === 0) {
            OurToaster.show({
                message: "Transaction Incomplete. No impact from the transaction"
            });
            return;
        }

        if (creditAmounts !== debitAmounts) {
            OurToaster.show({
                message: "Transaction Incomplete. A " + (creditAmounts > debitAmounts ? "Debit" : "Credit") +
                " transaction of " + Math.abs(creditAmounts - debitAmounts) + " is missing."
            });
            return;
        }
        /* create transaction objects */
        let setId = md5(moment().valueOf());
        entity.forEach((value, index) => {
            let transaction = new Transaction();
            transaction.trId = md5(moment().valueOf() + entity[index] + credit[index]);
            transaction.date = date;
            transaction.notes = notes;
            transaction.checkNo = cheque;
            transaction.voucherNo = voucher;
            transaction.entityName = entity[index];
            transaction.isCredit = credit[index];
            transaction.amount = amount[index];
            transaction.setId = setId;
            transactions.push(transaction);
        });

        /* check currency difference */
        entity.forEach((value, index) => {
            currencies[index] = this.getEntityDefaultCurrency(value);
        });


        let x = currencies[0];
        isCurrencyDifferent = !currencies.every(function (item) {
            return item === x;
        });

        this.props.handleCurrencyDifference(isCurrencyDifferent);
        this.props.handleEntityCallBack(entity);
        this.props.handleUpdatableTransactions(transactions);
        this.props.handleAmountCallBack(amount);
        this.setState({
            entities: entity,
            isCurrencyDifferent: isCurrencyDifferent,
            updatableTransactions: transactions
        });

        if (!isCurrencyDifferent) {
            transactionService.createTransaction(transactions, (response) => {
                OurToaster.show({message: "Transaction Added Successfully!"});
                this.handleRefreshCallBack();
            }, (error) => {
                OurToaster.show({message: "Error while adding a transaction due to : " + error.message});
            });
            this.setState({
                entryCount: 0,
                amount: 0
            });
        }
    };

    getEntityDefaultCurrency = (entity) => {
        let currency = 0;
        this.props.entityObjects.forEach(object => {
            if (object._entityName === entity) {
                currency = object._defaultCurrency;
            }
        });
        return currency;
    };

    incrementCount = (count) => {
        let val = this.state.entryCount;
        if (count === 1) {
            this.setState({
                entryCount: val + 1
            })
        } else {
            this.setState({
                entryCount: val > 0 ? val - 1 : val
            })
        }
    };

    handleEntityChange = (entity, index) => {};

    handleAmountChange = (amount, index) => {};

    handleCreditChange = (credit, index) => {};

    render(){
        let transactionElements = [];
        transactionElements.push(<View auto key={0} style={{flexDirection: 'row-inverse', padding: 0.2, alignItems: 'stretch', justifyContent: 'left'}}>
                                    <TransactionFullRow index={0} handleEntityChangeCallBack={this.handleEntityChange}
                                                        handleAmountChangeCallBack={this.handleAmountChange}
                                                        handleCreditChangeCallBack={this.handleCreditChange}
                                                        callbackIncrementor={this.incrementCount}
                                                        amount={this.state.amount}
                                                        entityList={this.props.entityList}/>
                                </View>);


        for (let i = 0; i < this.state.entryCount - 1; i++) {
            transactionElements.push(
                <View key={i + 1} auto style={{
                    flexDirection: 'row-inverse',
                    padding: 0.2,
                    alignItems: 'stretch',
                    justifyContent: 'left'
                }}>
                    <TransactionBasicRow handleEntityChangeCallBack={this.handleEntityChange}
                                         handleAmountChangeCallBack={this.handleAmountChange}
                                         handleCreditChangeCallBack={this.handleCreditChange}
                                         entityList={this.props.entityList}
                                         amount={''}
                                         index={i + 1}/>
                </View>);}
        return(
            <form onSubmit={this.submitForm}>
                <View column>
                    <View row height="">
                    </View>
                    {transactionElements.reverse()}
                </View>
                <View>
                    <button className="pt-button pt-icon-tick-circle pt-intent-success" type="submit">Submit</button>
                </View>
            </form>
        );
    }
}

export default AddTransactionComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});