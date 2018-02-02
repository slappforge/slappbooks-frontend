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

import axios from "axios";

/**
 * The service is responsible for obtaining updated exchange rates
 *
 * @author Malith Jayaweera
 */
class CurrencyService {
    constructor() {
        this.baseURL = "https://free.currencyconverterapi.com/api/v5";
    }

    get(url = this.baseURL, params = {}) {
        return axios.get(url, params)
    }


    getExchangeRate(fromCurrency, toCurrency, handleCurrency) {
        let url = this.baseURL + "/convert?q=" + fromCurrency + "_" + toCurrency + "&compact=y";
        return this.get(url)
            .then(response => handleCurrency(response))
            .catch(response => console.log(response));
    }
}

const currencyService = new CurrencyService();
export default currencyService;