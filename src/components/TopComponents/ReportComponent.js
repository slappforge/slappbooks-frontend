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
import TrialBalance from '../ReportView/TrialBalance'

/**
 *  The component acts as a controller rendering project views
 *
 *  @author Malith Jayaweera
 */
class ReportComponent extends React.Component {

    render() {
        return(
            <div>
                <TrialBalance />
            </div>);
    }
}

export default ReportComponent;