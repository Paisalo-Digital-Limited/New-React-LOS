export const getStoredUserName = () => localStorage.getItem('userName');

export const storeUserName = userName => localStorage.setItem('userName', userName);

export const removeStoredUserName = () => localStorage.removeItem('Designation');

export const getStoredDesignation = () => localStorage.getItem('Designation');

export const storeDesignation = Designation => localStorage.setItem('Designation', Designation);

export const removeStoredDesignation = () => localStorage.removeItem('Designation');