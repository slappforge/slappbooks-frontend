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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from '../../main.css';
import moment from 'moment';
import UpdateView from '../TransactionView/TransactionUpdateView/UpdateView';
import View from 'react-flexbox';
import transactionService from '../../services/TransactionService';

/**
 *  This represents an entity table of the Double Entry system. The table defaults to the current month and current year.
 *  On refresh the entity is updated with available transactions.
 *
 *  @author Malith Jayaweera
 */
class EntityTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.transactions,
            pages: 0,
            entityName: this.props.entityName,
            entityList: this.props.entityList,
            isOpen: false,
            loading: false,
            setId: '',
            clicked: false,
            updateTransactions: [],
            month: moment().startOf("month").format('MM'),
            year: moment().startOf("month").format('YYYY')
        };
    }

    onRowClick = (state, rowInfo, column, instance) => {
        return {
            style: {
                fontWeight: rowInfo !== undefined &&  rowInfo.row.notes === 'Balance Brought Forward' ? 'bold' : 'normal'
            },
            onClick: e => {
                this.setState({
                    setId: rowInfo.row.setId,
                    clicked: true
                });
                this.toggleDialog();
            }
        }
    };

    toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });

    handleClose = () => {
        this.toggleDialog();
        this.setState({
            clicked: false
        })
    };

    handleEntityChange = (entity, index) => {
        console.log(entity);
    };

    handleAmountChange = (amount, index) => {
        console.log(amount);
    };

    handleCreditChange = (credit, index) => {
        console.log(credit);
    };

    clickCallBack = () => {
        this.setState({
            clicked: false
        })
    };

    refresh  =(month, year) => {
        this.setState({loading: true});
        transactionService.getTransactions(this.state.entityName, 0, 5, [], [],month, year, (res) => {
            let values = res.data.rows;
            values.forEach(key => {
                key.amount = key.amount.toLocaleString();
                key.amount = key.isCredit ? "(" + (key.amount) + ")" : (key.amount);
                key.date = moment(key.date).format('YYYY-MM-DD');
            });
            this.setState({
                data: values,
                pages: res.data.pages,
                loading: false
            })
        });
    };

    initialize = () => {
      this.refresh(this.state.month, this.state.year);
    };

    handleMonthChange = (event) => {
        this.setState({
            month: event.target.value
        });
        this.refresh(event.target.value, this.state.year);
    };

    handleYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
        this.refresh(this.state.month, event.target.value);
    };

    handleRefresh = () => {
        this.props.handleRefreshCallback();
    };

    render() {
        return (
            <div className={styles.visible}>
                <UpdateView handleRefreshCallback={this.handleRefresh} handleCloseCallback={this.handleClose} clickCallback={this.clickCallBack} isOpen={this.state.isOpen} setId={this.state.setId} clicked={this.state.clicked} entityList={this.props.entityList}/>
                <div className="pt-card pt-elevation-3">
                    <View auto style={{
                        flexDirection: 'row-inverse',
                        padding: 0.2,
                        alignItems: 'stretch',
                        justifyContent: 'left'
                    }}>
                        <View column width="100px">
                            <h6 className="pt-button">{this.state.entityName}</h6>
                        </View>
                        <View column width="110px">
                            <label className="pt-label pt-inline" htmlFor="month">
                                <div className="pt-select pt-inline">
                                    <select ref="month" defaultValue={this.state.month} onChange={this.handleMonthChange} name="month">
                                        <option value={"01"}>January</option>
                                        <option value={"02"}>February</option>
                                        <option value={"03"}>March</option>
                                        <option value={"04"}>April</option>
                                        <option value={"05"}>May</option>
                                        <option value={"06"}>June</option>
                                        <option value={"07"}>July</option>
                                        <option value={"08"}>August</option>
                                        <option value={"09"}>September</option>
                                        <option value={"10"}>October</option>
                                        <option value={"11"}>November</option>
                                        <option value={"12"}>December</option>
                                    </select>
                                </div>
                            </label>
                        </View>
                        <View column>
                            <label className="pt-label pt-inline" htmlFor="year">
                                <div className="pt-select pt-inline">
                                    <select ref="year" defaultValue={this.state.year} onChange={this.handleYearChange} name="year">
                                        <option value={"2018"}>2018</option>
                                        <option value={"2017"}>2017</option>
                                    </select>
                                </div>
                            </label>
                        </View>
                        <View column width="40px">
                            <button type="button"  className="pt-button pt-small pt-icon-refresh refresh" onClick={() => this.refresh(this.state.month, this.state.year)}></button>
                        </View>
                    </View>
                    <ReactTable
                    data={this.state.data}
                    pages={this.state.pages}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Date",
                                    accessor: "date",
                                    maxWidth: 100
                                },
                                {
                                    Header: "Check No",
                                    accessor: "checkNo",
                                    maxWidth: 100
                                },
                                {
                                    Header: "Voucher No",
                                    accessor: "voucherNo",
                                    maxWidth: 100
                                },
                                {
                                    Header: "Notes",
                                    accessor: "notes"
                                },
                                {
                                    Header: "R",
                                    accessor: "reconcile",
                                    maxWidth: 40
                                },
                                {
                                    Header: 'Amount',
                                    maxWidth: 300,
                                    accessor: "amount",
                                    Cell: props =>(<span className='float-right'>{props.value}</span>)
                                },
                                {
                                    Header: "setId",
                                    accessor: "setId",
                                    show: false
                                }
                            ]
                        }
                    ]}
                    getTrProps={this.onRowClick}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    manual
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        transactionService.getTransactions(this.state.entityName, state.page, state.pageSize, state.sorted, state.filtered, this.state.month, this.state.year, (res) => {
                            let values = res.data.rows;
                            values.forEach(key => {
                                key.amount = key.amount.toLocaleString();
                                key.amount = key.isCredit ? "(" + (key.amount) + ")" : (key.amount);
                                key.date = moment(key.date).format('YYYY-MM-DD');
                                key.reconcile = key.reconcile === 1 ? "Y" : "N";
                            });
                            this.setState({
                                data: values,
                                pages: res.data.pages,
                                loading: false
                            })
                        });
                    }}/>
                </div>
            </div>
        );
    }

}

export default EntityTable;