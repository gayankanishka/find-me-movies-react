import axios from 'axios';
import stringUtils from '../../utils/string.utils';
import config from '../../config';

const httpClient = axios.create({
  baseURL: config.tmdbApi.baseUrl,
  headers: {
    Authorization: `Bearer ${config.tmdbApi.apiKey}`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

async function get(endpoint, params) {
  const url = stringUtils.createUrl(endpoint, params);
  const res = await httpClient.get(url);
  return res.data;
}

const apiService = {
  get
};

export default apiService;
