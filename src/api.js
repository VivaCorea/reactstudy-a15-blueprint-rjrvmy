import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchList() {
  return axios(`${BASE_URL}/coins`).then((res) => res.data.slice(0, 100));
}

export function fetchItemInfo(coinId) {
  return axios(`${BASE_URL}/coins/${coinId}`).then((res) => res.data);
}

export function fetchItemTickers(coinId) {
  return axios(`${BASE_URL}/tickers/${coinId}`).then((res) => res.data);
}
