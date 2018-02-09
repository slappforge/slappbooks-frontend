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
import {FocusStyleManager, Toaster, Position, Intent} from '@blueprintjs/core';
import Entity from "../../models/Entity";
import EntityTableView from "../EntityView/EntityTableView";
import ModifierView from "../ModifierComponents/ModifierView";
import transactionService from "../../services/TransactionService";

/**
 * This handles the main page of the accounting system
 *
 * @author Malith Jayaweera
 */
class BodyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            entityList: [],
            entityObjects: [],
            transactionList: []
        };
        this.populateEntityList();
    }

    populateEntityList = () => {
        transactionService.getEntity((response) => {
            let entities = response.data;
            let entityNames = [];
            let entityObjects = [];
            entities.forEach(entity => {
                entityNames.push(entity.entityName);
                entityObjects.push(new Entity(entity.entityName, entity.entityType, entity.defaultCurrency));
            });
            this.setState({
                entityList : entityNames,
                entityObjects : entityObjects
            });
        }, (error) => {
            OurToaster.show({message: "Error while loading entity names due to : " + error.message});
        });
    };

    handleRefreshCall = () => {
        this.child.refresh();
    };

    handleEntityRefreshCall = () => {
        this.populateEntityList();
    };

    render() {
        FocusStyleManager.alwaysShowFocus();
        return (
            <div>
                <ModifierView handleRefreshCallback={this.handleRefreshCall} handleEntityRefreshCallback={this.handleEntityRefreshCall} entityObjects={this.state.entityObjects} entityList={this.state.entityList} newlyCreatedTransactions={this.addTransactionCallBack}/>
                <EntityTableView ref={instance => { this.child = instance; }} transactions={this.state.transactionList} entityList={this.state.entityList}/>
            </div>
        );
    }
}

export default BodyComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.DANGER
});