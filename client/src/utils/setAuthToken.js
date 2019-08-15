import axios from 'axios';


//Takes in token, if token is there, add to headers, if not, delete from headers

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }  else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

//Sending token with every request

export default setAuthToken;