import axios from 'axios'
import { setAlert } from './alert'
import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOG_OUT,
  PROFILE_CLEAR,
} from './types'
import { AUTH_ERROR, LOGGED_IN, LOGIN_FAIL } from './types'
import { USER_LOADED } from './types'
import setAuthToken from '../utils/setAuthToken'
import { Redirect } from 'react-router-dom'

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth') //take that token above and get user data

    dispatch({
      type: USER_LOADED,
      payload: res.data, //user
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

//register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, // token we get from backend
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAILED,
    })
  }
}

//login user

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)
    dispatch({
      type: LOGGED_IN,
      payload: res.data, // token
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

//LOG OUT

export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  }),
    dispatch({
      type: PROFILE_CLEAR,
    })
}
