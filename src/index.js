import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import App from './components/app/app';
import store from "./store";
import ErrorBoundary from "./components/error-boundary";
import { ServiceProvider } from "./components/service-context";
import UsersService from "./services/users-service";


const usersService = new UsersService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <ServiceProvider value={usersService}>
                <App />
            </ServiceProvider>
        </ErrorBoundary>
    </Provider>
    , document.getElementById('root'));

