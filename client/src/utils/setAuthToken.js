import Axios from 'axios';

const setAuthToken = token => {
	if(token){
		//Apply token to every request
		Axios.defaults.headers.common['Authorization'] = token;
	} else {
		//Delete Auth header if token is not present
		delete Axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;