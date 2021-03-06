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

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BodyComponent from "./BodyComponent";
import ReportComponent from "./ReportComponent";
import SettingsComponent from "../SettingsView/SettingsComponent";

/**
 * This handles the routing within the application
 *
 * @author Malith Jayaweera
 */
const MainView = () => (
    <main>
        <Switch>
            <Route exact path='/' component={BodyComponent}/>
            <Route exact path='/reports' component={ReportComponent}/>
            <Route exact path='/settings' component={SettingsComponent} />
        </Switch>
    </main>
);

export default MainView;