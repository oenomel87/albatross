import Cookies from 'js-cookie';
import axios from 'axios';

const tokenName = '_albatross_token';

export function setAuthToken(token) {
  return Cookies.set(tokenName, token, { secure: true });
}

export function getAuthToken() {
  return Cookies.get(tokenName);
}

export function resetAuthToken() {
  return Cookies.remove(tokenName);
}

export async function checkAuthTokenIsValid() {
  const token = getAuthToken();
  const headers = {
    'x-access-token': token ? token : null
  };

  try {
    const result = await axios.get('http://localhost:9999/api/', { headers });
    return result.status === 200;
  } catch (error) {
    return false;
  }
}
