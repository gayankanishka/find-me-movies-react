import axios from 'axios';
import createUrl from '../../utils/url.utils';
import config from '../../config';

const httpClient = axios.create({
  baseURL: config.tmdbApi.baseUrl,
  headers: {
    Authorization: `Bearer ${config.tmdbApi.apiKey}`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

function get(endpoint, params) {
  const url = createUrl(endpoint, params);
  return httpClient.get(url).then((res) => res.data);
}

const apiService = {
  get
};

export default apiService;
