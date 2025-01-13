export const getStoredUserName = () => localStorage.getItem('userName');

export const storeUserName = userName => localStorage.setItem('userName', userName);

export const removeStoredUserName = () => localStorage.removeItem('Designation');

export const getStoredDesignation = () => localStorage.getItem('Designation');

export const storeDesignation = Designation => localStorage.setItem('Designation', Designation);

export const removeStoredDesignation = () => localStorage.removeItem('Designation');

export const getStoredEmail = () => localStorage.getItem('email');

export const storeEmail = mail => localStorage.setItem('email', mail);

export const removeStoredEmail = () => localStorage.removeItem('email');
