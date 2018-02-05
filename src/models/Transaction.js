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

/**
 * This represents a transaction of the double entry system
 *
 * @author Malith Jayaweera
 */
class Transaction {
    constructor(date, entityName, checkNo, voucherNo, notes, reconcile="1", amount, isCredit, trId, setId) {
        this.date = date;
        this.entityName = entityName;
        this.checkNo = checkNo;
        this.voucherNo = voucherNo;
        this.notes = notes;
        this.reconcile = reconcile;
        this.amount = amount;
        this.trId = trId;
        this.isCredit = isCredit;
        this.setId = setId;
    }

    getTransaction() {
        return {
            date: this.date,
            checkNo: this.checkNo,
            voucherNo: this.voucherNo,
            notes: this.notes,
            amount: this.amount,
            isCredit: this.isCredit,
            entityName: this.entityName,
            trId: this.trId,
            reconcile: this.reconcile,
            setId: this.setId
        }
    }
}

export default Transaction;