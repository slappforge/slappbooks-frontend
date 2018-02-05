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
import {Button, Dialog, Intent, Position, Toaster} from '@blueprintjs/core';
import UpdateViewBody from './UpdateViewBody';
import transactionService from '../../../services/TransactionService';

/**
 * The class generates an update component for a user to update a transaction. A transaction might contain multiple
 * entries. The component is responsible for rendering all entries in an editable mode in a Dialog component.
 *
 * @author Malith Jayaweera
 */
class UpdateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            updateTransactions: [],
            setId: this.props.setId,
            clicked: this.props.clicked,
            entityList: this.props.entityList,
            isConfirmationOpen: false,
            loaded: false,
        };
    }

    handleClose = () => {
        this.props.handleCloseCallback();
        this.setState({
                updateTransactions : []
            })
    };

    handleSuperClose = () => {
        this.closeConfirmation();
    };

    handleRefresh = () => {
        this.props.handleRefreshCallback();
    };

    generateDialogView = () => {
        if(this.props.isOpen  && this.props.clicked) {
            transactionService.getTransactionObject(this.props.setId, (response) => {
                let transactions = response.data;
                this.props.clickCallback();
                this.setState({
                    updateTransactions: transactions,
                    clicked: false,
                    loaded: true
                });
            });
        }
    };

    updateTransaction = () => {
        let transactions = this.state.updateTransactions.slice();
        transactions.forEach(transaction => {
            transaction.setId = this.props.setId;
        });
        transactionService.updateTransaction(transactions, () => {
            OurToaster.show({message: "Successfully updated the transaction with setId " + this.props.setId});
            this.handleRefresh();
        }, (error) => {
            OurToaster.show({message: "Could not update the transaction due to : " + error.message});
        });
        this.handleClose();
    };

    deleteTransaction = () => {
        transactionService.deleteTransaction(this.props.setId, () => {
            OurToaster.show({message: "Successfully deleted the transaction with setId " + this.props.setId});
            this.handleRefresh();
        }, (error) => {
            OurToaster.show({message: "Could not delete the transaction due to : " + error.message});
        });
        this.closeConfirmation();
    };

    openConfirmation = () => {
        this.handleClose();
        this.setState({
            isConfirmationOpen: true
        });
    };

    closeConfirmation = () => {
        this.setState({
            isConfirmationOpen: false
        });
    };

    handleEntityChange = (entity, index) => {
        let transactions = this.state.updateTransactions;
        transactions[index].entityName = entity;
        this.setState({
            updatableTransactions : transactions
        });
    };

    handleAmountChange = (amount, index) => {
        let transactions = this.state.updateTransactions;
        transactions[index].amount = amount;
        this.setState({
            updatableTransactions : transactions
        });
    };

    handleCreditChange = (isCredit, index) => {
        let transactions = this.state.updateTransactions;
        console.log(isCredit);
        transactions[index].isCredit = isCredit;
        this.setState({
            updatableTransactions : transactions
        });
    };

    render() {
        this.generateDialogView();
        return(
            <div>
                <Dialog
                    iconName="dollar"
                    hasBackdrop={true}
                    className={"pt-popover-content-sizing"}
                    isOpen={this.state.isConfirmationOpen}
                    onClose={this.handleClose}
                    title="Confirm Action">
                    <div className="pt-dialog-body">
                        <p>Are you sure you want to delete the transaction?</p>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button className={"pt-intent-success"} onClick={this.deleteTransaction} text="Yes" />
                            <Button className={"pt-button pt-intent-danger"} onClick={this.handleSuperClose} text="No"/>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    iconName="dollar"
                    hasBackdrop={true}
                    className={"pt-popover-content-sizing"}
                    isOpen={this.props.isOpen}
                    onClose={this.handleClose}
                    title="Transaction Snapshot">
                    <div className="pt-dialog-body">
                        <UpdateViewBody handleEntityChange={this.handleEntityChange}
                                        handleAmountChange={this.handleAmountChange}
                                        handleCreditChange={this.handleCreditChange}
                                        updateTransactions={this.state.updateTransactions}
                                        entityList={this.props.entityList}
                                        isOpen={this.state.isOpen}
                                        setId={this.state.setId}
                                        clicked={this.state.clicked}
                                        loaded={this.state.loaded}/>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button className={"pt-intent-success"} onClick={this.updateTransaction} text="Update" />
                            <Button className={"pt-button pt-intent-danger"} onClick={this.openConfirmation} text="Delete"/>
                            <Button className={"pt-button pt-intent-danger"} onClick={this.handleClose} text="Close"/>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default UpdateView;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});