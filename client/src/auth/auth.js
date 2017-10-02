

// import auth0 from 'auth0-js';
// import history from './history.js';

// export default class Auth {

//     constructor() {
//         this.login = this.login.bind(this);
//         this.logout = this.logout.bind(this);
//         this.handleAuthentication = this.handleAuthentication.bind(this);
//         this.isAuthenticated = this.isAuthenticated.bind(this);
//       }


//   auth0 = new auth0.WebAuth({
//     domain: 'radstransfer.eu.auth0.com',
//     clientID: 'eaZ4LwBKv4RJHGazkBQn23sTrusYtJ1H',
//     redirectUri: 'http://localhost:3000',
//     audience: 'https://radstransfer.eu.auth0.com/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });

//   login() {
//     this.auth0.authorize();
//   }

//   handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       alert(authResult);
//       if (!authResult) {
//         this.login();
//       } else if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//         //history.replace('/');
//       } else if (err) {
//         history.replace('/');
//         console.log(err);
//       }
//     });
//   }

//   setSession(authResult) {
//     // Set the time that the access token will expire at
//     let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//     // navigate to the home route
//     history.replace('/');
//   }

//   logout() {
//     // Clear access token and ID token from local storage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     // navigate to the home route
//     history.replace('/');
//   }

//   isAuthenticated() {
//     // Check whether the current time is past the 
//     // access token's expiry time
//     let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     return new Date().getTime() < expiresAt;
//   }
// }

import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

// const CLIENT_ID = '{AUTH0_CLIENT_ID}';
const CLIENT_ID = 'eaZ4LwBKv4RJHGazkBQn23sTrusYtJ1H';

const CLIENT_DOMAIN = 'radstransfer.eu.auth0.com';
// const REDIRECT = 'YOUR_CALLBACK_URL';
const REDIRECT = 'http://localhost:3000/callback';

//const SCOPE = 'YOUR_SCOPE';
const SCOPE = 'read:alldata';

//const AUDIENCE = 'AUDIENCE_ATTRIBUTE';
const AUDIENCE = 'http://radstransfersapi.co.uk';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  browserHistory.push('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}