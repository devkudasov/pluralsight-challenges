import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
  return get('users');
}

export function deleteUser(id) {
  return del(`users/${id}`)
}

function get(url) {
  return getFetch(url, 'GET');
}

function del(url) {
  return getFetch(url, 'DELETE');
}

function getFetch(url, method) {
  const request = new Request(baseUrl + url, {
    method
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.error(error); // eslint-disable-line no-console
}
