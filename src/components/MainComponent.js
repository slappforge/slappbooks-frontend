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
import {FocusStyleManager} from '@blueprintjs/core';
import Header from './TopComponents/HeaderComponent';
import MainView from './TopComponents/MainView'

/**
 * This handles the main page of the accounting system
 *
 * @author Malith Jayaweera
 */
class MainComponent extends React.Component {

    render() {
        FocusStyleManager.alwaysShowFocus();
        return (
            <div className="panel">
                <Header />
                <MainView />
            </div>
        );
    }
}

export default MainComponent;