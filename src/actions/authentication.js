import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE, 
    JOIN_REQUEST,
    JOIN_SUCCESS,
    JOIN_FAILURE,
    GET_STATUS_REQUEST,
    GET_STATUS_SUCCESS,
    GET_STATUS_FAILURE,
    LOGOUT_SUCCESS,
} from './ActionTypes';
import axios from 'axios';

export function login(username, password) {
  return dispatch => {
    dispatch(request());

    return axios.post(`http://localhost:3002/login`, { username, password })
      .then(response => {
        dispatch(success(username));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  }

  function request() { return { type: LOGIN_REQUEST } }
  function success(username) { return { type: LOGIN_SUCCESS, currentUser: username } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

export function join(username, password, passwordConfirm) {
  return dispatch => {
    dispatch(request());

    return axios.post(`http://localhost:3002/join`, { username, password, passwordConfirm })
      .then(response => {
        dispatch(success());
      })
      .catch(error => {
        dispatch(failure(error));
      });
  }

  function request() { return { type: JOIN_REQUEST } }
  function success() { return { type: JOIN_SUCCESS } }
  function failure(error) { return { type: JOIN_FAILURE, error } }
}

export function getStatus() {
  return dispatch => {
    dispatch(request());

    return axios.get(`http://localhost:3002/status`)
      .then(response => {
        dispatch(success(response.data.username));
        return { success: true };
      })
      .catch(error => {
        dispatch(failure(error));
      });
  }

  function request() { return { type: GET_STATUS_REQUEST } }
  function success(username) { return { type: GET_STATUS_SUCCESS, currentUser: username } }
  function failure(error) { return { type: GET_STATUS_FAILURE, error } }
}

export function logout() {
  return dispatch => {
    return axios.post(`http://localhost:3002/logout`)
      .then(response => {
        dispatch(success());
      })
  }

  function success() { return { type: LOGOUT_SUCCESS } }
}
