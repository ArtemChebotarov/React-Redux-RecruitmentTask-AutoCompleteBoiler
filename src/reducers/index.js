const initialState = {
    users: [],
    usersPresent: [],
    inputValue: ''
}

const index = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_LOADED':
            return state = {
                ...state,
                users: action.payload
            };
        case 'USERS_SHOWED':
            return state = {
                ...state,
                usersPresent: action.payload
            }
        case 'INPUT_VALUE_CHANGED':
            return state = {
                ...state,
                inputValue: action.payload
            }
        default:
            return state;
    }
}

export default index;