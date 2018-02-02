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
import EntityTable from './EntityTable';

/**
 *  This represents the full entity view. The view will be generated using @EntityTable components
 *
 *  @author Malith Jayaweera
 */
class EntityTableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: this.props.transactions,
            entityList: this.props.entityList,
        };
        this.child = [];
    }

    refresh = () => {
        setTimeout( () => {
            this.child.forEach(child => {
            child.initialize();
            });
        }, 0);

    };

    render() {
        let tableElements = [];
        for (let i = 0; i < this.props.entityList.length; i++) {
            let insertableTransactions = [];
            let entityName = this.props.entityList[i];
            //eslint-disable-next-line
            insertableTransactions.push(...this.props.transactions.filter(transaction => {
                return (transaction.entityName === entityName)
            }));
            tableElements.push(<EntityTable ref={instance => { this.child.push(instance); }} handleRefreshCallback={this.refresh} transactions={insertableTransactions} entityName={entityName} entityList={this.props.entityList} key={i}/>);
        }
        return(<div>{tableElements}</div>);
    }
}

export default EntityTableView;