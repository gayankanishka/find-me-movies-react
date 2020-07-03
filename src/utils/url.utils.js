import qs from 'qs';

export default function createUrl(endpoint, queryParams) {
  const params = { ...(queryParams || {}) };
  const paramString = qs.stringify(params);
  return `${endpoint}?${paramString}`;
}
