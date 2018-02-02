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
 * This represents a Currency Conversion object
 *
 * @author Malith Jayaweera
 */
class CurrencyConversion {
    constructor(toCurrency, fromCurrency, conversionRate) {
        this._toCurrency = toCurrency;
        this._fromCurrency = fromCurrency;
        this._conversionRate = conversionRate;
    }


    get toCurrency() {
        return this._toCurrency;
    }

    set toCurrency(value) {
        this._toCurrency = value;
    }

    get fromCurrency() {
        return this._fromCurrency;
    }

    set fromCurrency(value) {
        this._fromCurrency = value;
    }

    get conversionRate() {
        return this._conversionRate;
    }

    set conversionRate(value) {
        this._conversionRate = value;
    }
}

export default CurrencyConversion;