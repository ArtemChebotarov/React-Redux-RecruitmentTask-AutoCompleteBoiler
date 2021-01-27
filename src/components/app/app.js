import React from 'react';
import AutoCompleteInput from "../auto-complete-input";

import { withUsersService } from './../hoc';

const App = () => {
    return (
        <div className="App">
            <AutoCompleteInput />
        </div>
    )
}

export default withUsersService()(App);
