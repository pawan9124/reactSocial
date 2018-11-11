import Axios from 'axios';
import { GET_ERRORS, 
		GET_PROFILE,
		GET_PROFILES,  
		PROFILE_LOADING, 
		CLEAR_CURRENT_PROFILE, 
		SET_CURRENT_USER
		} 
		from './types';

//Get current profiles

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	Axios.get('/api/profile')
		.then(res =>{
				dispatch({
					type:GET_PROFILE,
					payload:res.data
				})
			})
		.catch(err =>{
				dispatch({
					type:GET_PROFILE,
					payload:{}
				})
			});
};

//Get profile by handle
export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	Axios.get(`/api/profile/handle/${handle}`)
		.then(res =>{
				dispatch({
					type:GET_PROFILE,
					payload:res.data
				})
			})
		.catch(err =>{
				dispatch({
					type:GET_PROFILE,
					payload:null
				})
			});
};



//Add Experience
export const addExperience = (expData, history) => dispatch => {
	Axios.post('/api/profile/experience',expData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		}))
}; 

//Add Education
export const addEducation = (eduData, history) => dispatch => {
	Axios.post('/api/profile/education',eduData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		}))
};

//Delete Experience
export const deleteExperience = (id) => dispatch => {
	Axios.delete(`/api/profile/experience/${id}`)
		.then(res =>
				dispatch({
					type:GET_PROFILE,
					payload: res.data
				})
			)
		.catch(err => 
				dispatch({
					type:GET_ERRORS,
					payload:err.response.data
				})
			)
} ;

//Get all profiles
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	Axios.get('/api/profile/all')
		.then(res =>
				dispatch({
					type:GET_PROFILES,
					payload: res.data
				})
			)
		.catch(err => 
				dispatch({
					type:GET_PROFILES,
					payload:null
				})
			)
} ;

//Delete Education
export const deleteEducation = (id) => dispatch => {
	Axios.delete(`/api/profile/education/${id}`)
		.then(res =>
				dispatch({
					type:GET_PROFILE,
					payload: res.data
				})
			)
		.catch(err => 
				dispatch({
					type:GET_ERRORS,
					payload:err.response.data
				})
			)
} ;


//Delete account & profile
export const deleteAccount = () => dispatch => {
	if(window.confirm('Are you sure? This Cannot be undone!')) {
		Axios.delete('/api/profile')
		.then(res=>
			dispatch({
				type:SET_CURRENT_USER,
				payload:{}
			})
		)
		.catch(err =>
				dispatch({
					type:GET_ERRORS,
					payload: err.response.data
				})
			);
	}
}

// Profile loading
export const setProfileLoading = () => {
	return {
		type:PROFILE_LOADING
	}
}

//Create Profile
export const createProfile = (profileData,history) => dispatch => {
	Axios.post('/api/profile',profileData)
		.then(res=> history.push('/dashboard'))
		.catch(err=> dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}))
};

// Profile loading
export const clearCurrentProfile = () => {
	return {
		type:CLEAR_CURRENT_PROFILE
	}
}