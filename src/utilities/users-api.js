import sendRequest from "./send-request";
const BASE_URL = '/api/users';


// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

// The sendRequest function always returns a promise and we are passing that promise to the caller of checkToken.