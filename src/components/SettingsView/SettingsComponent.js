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
import View from 'react-flexbox'
import {Intent, Position, Toaster} from '@blueprintjs/core';

/*
 * This handles the Settings within the application
 *
 */
class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl : localStorage.getItem('REACT_APP_API') || process.env.REACT_APP_API_HOST
        }
    }

    submitSettings = (e) => {
        e.preventDefault();
        let url = e.target.apiUrl.value;
        this.setState({
            apiUrl: url
        });
        localStorage.setItem('REACT_APP_API', url);
        OurToaster.show({message: "Slappbooks application endpoint has been configured"});
    };

    render() {
        return(
            <div className={"pt-card full-height"}>
                <form onSubmit={this.submitSettings} className={"relativePosition"}>
                    <View auto style={{
                        flexDirection: 'row-inverse',
                        padding: 0.2,
                        alignItems: 'stretch',
                        justifyContent: 'left'
                    }}>
                        <View row>
                            <View width={"100px"}>
                                <label className="pt-label pt-inline" htmlFor="apiUrl">
                                API URL
                                </label>
                            </View>
                            <View column>
                                <View width={"800px"}>
                                    <input ref="apiUrl" size={"80"} className="pt-input" type="text" name="apiUrl" defaultValue={this.state.apiUrl}></input>
                                </View>
                            </View>
                        </View>
                        <View column width={"300px"}>
                            <button className="pt-button pt-small pt-icon-tick-circle pt-intent-success float-right" type="submit">Submit</button>
                        </View>
                    </View>
                </form>
            </div>);
    }
}

export default SettingsComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});