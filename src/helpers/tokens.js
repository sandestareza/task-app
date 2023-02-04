export const setToken = (token) => localStorage.setItem('token', token) 
export const getToken = () => localStorage.getItem('token') 
export const checkToken = () => localStorage.getItem('token') ? true : false
export const removeToken = () => localStorage.removeItem('token')