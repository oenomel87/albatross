import Cookies from 'js-cookie';
import axios from 'axios';

import globalConfig from '../config.js';

export function setAuthToken(token) {
  return Cookies.set(globalConfig.tokenName, token, { secure: true });
}

export function getAuthToken() {
  return Cookies.get(globalConfig.tokenName);
}

export function resetAuthToken() {
  return Cookies.remove(globalConfig.tokenName);
}

export async function checkAuthTokenIsValid() {
  const token = getAuthToken();
  const headers = {
    'x-access-token': token ? token : null
  };

  try {
    const result = await axios.get(`${globalConfig.apiServer}/api/`, { headers });
    return result.status === 200;
  } catch (error) {
    return false;
  }
}
