import axios from 'axios';
// import { hashHistory } from 'react-router-dom';
import * as types from '../constants/index';

export function signUp(data) {
  return {
    type: types.SIGN_UP_USER,
    payload: data,
  };
}

export function signUpAsync(user) {
  console.log('adsaad');
  return (dispath) => {
    axios.post('http://localhost:3000/api/users', { email: user.email, password: user.password });
    console.log('asdas')
      .then((response) => {
        console.log(response.data);
        dispath(signUp(response.data));
        // hashHistory.push(`/?user=${response.data.email}/`);
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  };
}

export function logIn(data) {
  return {
    type: types.LOGIN_REQUEST,
    payload: data,
  };
}

export function logInAsync(user) {
  return dispath => axios({
    method: 'post',
    url: 'http://localhost:3000/api/users/login',
    withCredentials: true,
    data: {
      email: user.email,
      password: user.password,
    },
  })
    .then((response) => {
      dispath(logIn(response.data));
      // hashHistory.push(`/?user=${response.data.email}/`);
    });
  // .catch((error) => {
  //   console.log(error);
  // });
}

export function logOut() {
  return {
    type: types.LOG_OUT_REQUEST,
  };
}

export function logOutAsync() {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/users/logout',
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        console.log('success logout');
        dispatch(logOut());
      })
      .catch((error) => {
        console.log('logout error:');
        console.log(error);
      });
  };
}
