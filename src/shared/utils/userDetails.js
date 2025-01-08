export const getStoredUserName = () => localStorage.getItem('userName');

export const storeUserName = userName => localStorage.setItem('userName', userName);

export const removeStoredUserName = () => localStorage.removeItem('userName');