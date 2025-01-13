export const getStoredAuthToken = () => localStorage.getItem('authToken');

export const storeAuthToken = token => localStorage.setItem('authToken', token);

export const removeStoredAuthToken = () => localStorage.removeItem('authToken');

export const getStoredRefereshToken = () => localStorage.getItem('refereshToken');

export const storeRefereshToken = token => localStorage.setItem('refereshToken', token);

export const removeStoredRefereshToken = () => localStorage.removeItem('refereshToken');

export const SavedToken = localStorage.getItem('authToken');


export const getStoredPageName = () => localStorage.getItem('pageName');

export const storePageName = pageName =>{
    localStorage.setItem('pageName', pageName);
    window.dispatchEvent(new Event("storage"));
} ;

