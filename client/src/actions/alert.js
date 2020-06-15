import { SET_ALERT, REMOVE_ALERT } from './types'
import { v4 } from 'uuid'
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = v4()
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  })
  setTimeout(
    () =>
      dispatch({ type: REMOVE_ALERT, payload: id }).delay(1000).fadeOut(500),
    5000
  )
}
