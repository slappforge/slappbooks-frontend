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
import TransactionBasicRow from '../TransactionRowView/TransactionBasicRow';

/**
 * The class generates a body for the UpdateView component. After data has been retrieved the body will be updated to
 * reflect the data
 *
 * @author Malith Jayaweera
 */
class UpdateViewBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTransactions : this.props.updateTransactions,
            entityList: this.props.entityList,
            loaded: this.props.loaded
        }
    }

    handleEntityChange = (entity, index) => {
        this.props.handleEntityChange(entity, index);
    };

    handleAmountChange = (amount, index) => {
        this.props.handleAmountChange(amount, index);
    };

    handleCreditChange = (credit, index) => {
        this.props.handleCreditChange(credit, index);
    };

    render(){
        let content = [];
        this.props.updateTransactions.forEach( (transaction, index) => {
            let isCredit;
            if((transaction.amount).toString().startsWith("(") && transaction.amount.toString().endsWith(")")) transaction.amount = transaction.amount.slice(1, transaction.amount.length-1); isCredit= transaction.isCredit;
            content.push( <TransactionBasicRow  handleEntityChangeCallBack={(event) => this.handleEntityChange(event, index)}
                                                handleAmountChangeCallBack={(event) => this.handleAmountChange(event, index)}
                                                handleCreditChangeCallBack={(event) => this.handleCreditChange(event, index)} key={index} entityList={this.state.entityList} entity={transaction.entityName} amount={transaction.amount} isCredit={isCredit}/>);
        });
        return(
            <div>
                {content}
            </div>
        );
    }
}

export default UpdateViewBody;