import React, {useEffect} from 'react';
import AutoCompleteInput from "./components/auto-complete-input";

import {setUsers} from "./services/actions";
import reducer from "./services/reducer";
import {createStore} from "redux";
import UsersService from "./services/usersService";

const usersService = new UsersService();
const store = createStore(reducer);
const { dispatch } = store;

const setUsersDispatch = async () => {
    const usersFetched = await usersService.getUsers();
    dispatch(setUsers(usersFetched));
    return store.getState();
};

const App = () => {
    let users;

    useEffect(() => {
        const initialProcess = async () => {
            users = await setUsersDispatch();
        }
        initialProcess();

    }, [])

    return (
        <div className="App">
            <AutoCompleteInput users={users} />
        </div>
    )
}

export default App;
