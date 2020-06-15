import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    // case PROFILE_CREATED:
    //   return {
    //     ...state,
    //     loading: false,
    //     profile: payload,
    //   }
    // case PROFILE_CREATED_ERROR:
    //   return {}
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      }

    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false }

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case PROFILE_CLEAR:
      return {
        ...state,
        repos: [],
        profile: null,
        loading: false,
      }
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      }
    default:
      return {
        ...state,
      }
  }
}
