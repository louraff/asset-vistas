import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
    //Fetch accepts an options object as the 2nd argument used to include a data payload, set headers, specifically method, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Great use case for the Logical OR Assignment Operator
    options.headers ||= {...options, Authorization: `Bearer ${token}`};
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code is not 200-299
  // res.json() returns a promise that resolves
  // to the data that was sent back by the server
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}