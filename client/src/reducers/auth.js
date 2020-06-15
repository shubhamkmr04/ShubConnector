import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOG_OUT,
  ACCOUNT_DELETED,
} from '../actions/types'
import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGGED_IN,
} from '../actions/types'
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  // takes initial state and action(type and payload data)
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case REGISTER_SUCCESS:
    case LOGGED_IN:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case AUTH_ERROR:
    case REGISTER_FAILED:
    case LOGIN_FAIL:
    case LOG_OUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null, // added
      }

    default:
      return state
  }
}
