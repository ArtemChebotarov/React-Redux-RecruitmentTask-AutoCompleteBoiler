const usersLoaded = (newUsers) => ({ type: 'USERS_LOADED', payload: newUsers });

const usersShowed = (newUsersShowed) => ({ type: 'USERS_SHOWED', payload: newUsersShowed });

const inputValueChanged = (newInputValue) => ({ type: 'INPUT_VALUE_CHANGED', payload: newInputValue });

export {
    usersLoaded,
    usersShowed,
    inputValueChanged
};