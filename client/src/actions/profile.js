import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  PROFILE_CLEAR,
  GET_PROFILES,
  GET_REPOS,
} from './types'
import axios from 'axios'
import { setAlert } from './alert'

//Get current user profile

export const getcurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// create new profile

export const createnewprofile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post('/api/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: PROFILE_CLEAR })
  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get profile by user Id
export const getProfileByUserId = (userid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userid}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
// add experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.put('/api/profile/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.put('/api/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//delete experience

export const deleteExperience = (id) => async (dispatch) => {
  if (
    window.confirm('Are you sure you want to delete this experience field?')
  ) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`)
      dispatch({
        payload: res.data,
        type: UPDATE_PROFILE,
      })
      dispatch(setAlert('Experience Removed', 'success'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

//delete education

export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this education field?')) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      })
      dispatch(setAlert('Education Removed', 'success'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

//Delete Account

export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm('Are you sure you want to permanently delete your account?')
  ) {
    try {
      await axios.delete('/api/profile')
      dispatch({
        type: ACCOUNT_DELETED,
      })
      dispatch({
        type: PROFILE_CLEAR,
      })
      dispatch(setAlert('Your account has been deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}
