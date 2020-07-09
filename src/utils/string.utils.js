import qs from 'qs';

function createUrl(endpoint, queryParams) {
  const params = { ...(queryParams || {}) };
  const paramString = qs.stringify(params);
  return `${endpoint}?${paramString}`;
}

function getDateString(date) {
  if (date) {
    return new Date(date).toDateString().split(' ').slice(1).join(' - ');
  }

  return '';
}

const stringUtils = {
  createUrl,
  getDateString
};

export default stringUtils;
