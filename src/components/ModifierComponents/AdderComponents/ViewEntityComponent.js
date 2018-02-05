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
import {Intent, Position, Toaster, Button, Dialog} from '@blueprintjs/core';
import transactionService from '../../../services/TransactionService';

/**
 *  This represents a @ViewEntityComponent. Entity details can be viewed in this tab mode. It has been designed to be used
 *  with the @ModifierView
 *
 *  @author Malith Jayaweera
 */
class ViewEntityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entityObjects : this.props.entityObjects,
            defaultCurrency : '',
            entityType: '',
            entityName: '',
            isConfirmationOpen: false
        }
    }

    handleRefreshCallBack = () => {
        this.props.handleRefreshCallback();
    };

    closeConfirmation = () => {
        this.setState({
            isConfirmationOpen: false
        });
    };

    handleRefreshCall = () => {
        this.props.handleRefreshCallback();
    };

    openConfirmation = () => {
        this.setState({
            isConfirmationOpen: true
        })
    };


    handleEntityChange = (e) => {
        let entityName = e.target.value;
        this.props.entityObjects.forEach(entity => {
            if(entity.entityName === entityName) {
                this.setState({
                    defaultCurrency: entity.defaultCurrency,
                    entityType: entity.entityType,
                    entityName: entity.entityName
                })
            }
        })
    };

    deleteEntity = () => {
        this.setState({
           isConfirmationOpen: true
        });
        transactionService.deleteEntity(this.state.entityName, () => {
            OurToaster.show({message: "Entity Deleted Successfully!"});
            this.handleRefreshCallBack();
        }, (error) => {
            OurToaster.show({message: "Could not delete the entity due to : " + error.message});
        });
        this.closeConfirmation();
    };

    entityListSelect() {
        let entityList = [];
        let i=0;
        this.props.entityObjects.forEach(entity => {
            entityList.push(<option value={entity.entityName} key={i++}>{entity.entityName}</option>)
        });
        return entityList;
    }


    render() {
        return(
            <div>
                <Dialog
                    iconName="dollar"
                    hasBackdrop={true}
                    className={"pt-popover-content-sizing"}
                    isOpen={this.state.isConfirmationOpen}
                    onClose={this.closeConfirmation}
                    title="Confirm Action">
                    <div className="pt-dialog-body">
                        <p>Are you sure you want to delete the entity {this.state.entityName}? Deleting the entity
                        would delete all associated transactions.</p>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button className={"pt-intent-success"} onClick={this.deleteEntity} text="Yes" />
                            <Button className={"pt-button pt-intent-danger"} onClick={this.closeConfirmation} text="No"/>
                        </div>
                    </div>
                </Dialog>
                <View column>
                    <View auto style={{
                        flexDirection: 'row-inverse',
                        padding: 0.2,
                        alignItems: 'stretch',
                        justifyContent: 'left'
                    }}>
                        <View column width="">
                            <label className="pt-label pt-inline"  htmlFor={"entity"}>
                                Entity
                                <div className="pt-select">
                                    <select defaultValue={this.state.entity} onChange={e => this.handleEntityChange(e)} name={"entity"} >
                                        {this.entityListSelect()}
                                    </select>
                                </div>
                            </label>
                        </View>
                        <View column width="420px">
                            <label className="pt-label pt-inline" htmlFor="type">
                                Entity Type
                                <div className="pt-input" name={"type"}>
                                    <input type={"text"} value={this.state.entityType} className={"pt-button"} disabled={true}></input>
                                </div>
                            </label>
                        </View>
                        <View column>
                            <label className="pt-label pt-inline" htmlFor="currency">
                                Default Currency
                                <div className="pt-input" name={"currency"}>
                                    <input type={"text"} value={this.state.defaultCurrency} className={"pt-button"} disabled={true}></input>
                                </div>
                            </label>
                        </View>
                    </View>
                    <View>
                        <Button iconName="pt-icon-trash" className={"pt-button pt-intent-danger"} onClick={this.openConfirmation} text={"Delete"} />
                    </View>
                </View>
            </div>);
    }

}

export default ViewEntityComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});