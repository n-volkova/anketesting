import Axios from 'axios';

export function getProductionPath() {
  return 'https://anketesting.rocketbank.ru/api';
}

export function getDevelopmentPath() {
  return 'http://localhost:3000/api';
}

export function getApiPath() {
  return process.env.NODE_ENV === 'production' ? getProductionPath() : getDevelopmentPath();
}

export function registerPath() {
  Axios.defaults.baseURL = getApiPath();
}
