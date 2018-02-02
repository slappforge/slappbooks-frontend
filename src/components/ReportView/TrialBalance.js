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
import moment from 'moment';
import {CSVLink} from 'react-csv';
import transactionService from '../../services/TransactionService';
import currencyService from '../../services/CurrencyService';

/**
 * This handles the Trial Balance view
 *
 * @author Malith Jayaweera
 */
class TrialBalance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            year: moment().startOf("month").format('YYYY'),
            date: moment().valueOf()
        }
    }

    render() {
        return(
            <div>
                <div className={"pt-card"}>
                    <h6>Trial Balance</h6>
                    <div>
                        <CSVLink data={this.state.data} filename={"trial-balance-".concat(this.state.date.toString()).concat(".csv")}
                                 className={"pt-button pt-small pt-intent-primary"}>Download</CSVLink>
                    </div>
                </div>
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Account",
                                    accessor: "account",
                                    maxWidth: 1000
                                },
                                {
                                    Header: "Debit",
                                    accessor: "debit",
                                    maxWidth: 100,
                                    Cell: props =>(<span className='float-right'>{props.value}</span>)
                                },
                                {
                                    Header: "Credit",
                                    accessor: "credit",
                                    maxWidth: 100,
                                    Cell: props =>(<span className='float-right'>{props.value}</span>)
                                },
                            ]
                        }
                    ]}
                    getTrProps={(state, rowInfo, column, instance) => {
                        return {
                            style: {
                                fontWeight: rowInfo !== undefined &&  rowInfo.row.account === 'Total' ? 'bold' : 'normal'
                            }
                        }
                    }}
                    defaultPageSize={20}
                    className="-striped -highlight"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    manual
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        let spotRate;
                        currencyService.getExchangeRate('USD', 'LKR', (response) => {
                            let from = 'USD';
                            let to = 'LKR';
                            let data = response.data;
                            let valueObject = data.hasOwnProperty(from + "_" + to) ? data[from + "_" + to] : 0;
                            spotRate = valueObject.val;

                            transactionService.getTrialBalance(spotRate, (res) => {
                                let values = res.data;
                                let totalDebit = 0;
                                let totalCredit = 0;
                                values.forEach(value => {
                                    value.account = value.name;
                                    value.debit = !value.isCredit ? parseFloat(value.value).toFixed(2) : '';
                                    value.credit = value.isCredit ? parseFloat(value.value).toFixed(2) : '';
                                    delete value['name'];
                                    delete value['isCredit'];
                                    delete value['value'];
                                    totalDebit += value.debit !== '' ? +value.debit : 0;
                                    totalCredit += value.credit !== '' ? +value.credit : 0;
                                    value.debit = Number(value.debit).toLocaleString() === '0' ? '' : Number(value.debit).toLocaleString();
                                    value.credit = Number(value.credit).toLocaleString() === '0' ? '' : Number(value.credit).toLocaleString();
                                });

                                if(totalCredit !== totalDebit) {
                                    let balanceEntry = totalCredit - totalDebit;
                                    let balanceIsCredit = balanceEntry < 0;
                                    balanceEntry = Math.abs(balanceEntry);
                                    values.push({
                                        account: "Adjustment Entry",
                                        credit: balanceIsCredit ? balanceEntry.toLocaleString() : '',
                                        debit: !balanceIsCredit ? balanceEntry.toLocaleString() : ''
                                    })
                                }
                                values.push({
                                    account: "Total",
                                    credit: Math.max(totalCredit, totalDebit).toLocaleString(),
                                    debit: Math.max(totalCredit, totalDebit).toLocaleString()
                                });
                                this.setState({
                                    data: values,
                                    pages: res.data.pages,
                                    loading: false
                                })
                            });
                        });

                    }}
                    />
            </div>
        )
    }
}

export default TrialBalance;