import {
  UPDATE_UISTATE,
  UPDATE_SIDE_BAR_VISIBLE,
  UPDATE_LOGIN_MODAL_VISIBLE,
  UPDATE_ALERT,
} from "../ConstsRedux"

const initialState = {
  loginModalVisible: false,
  uiState: {
    scrollY: 0,
  },
  sideBarVisible: false,
  alertObject: {
    alertVisible: false,
    alertMessage: '',
  },
}

const reducers = (state = initialState, action) => {
  if (action.type === UPDATE_UISTATE) {
    return Object.assign({}, state, { uiState: action.uiState })
  } else if (action.type === UPDATE_SIDE_BAR_VISIBLE) {
    return Object.assign({}, state, { sideBarVisible: action.sideBarVisible })
  } else if (action.type === UPDATE_LOGIN_MODAL_VISIBLE) {
    return Object.assign({}, state, { loginModalVisible: action.loginModalVisible })
  } else if (action.type === UPDATE_ALERT) {
    return Object.assign({}, state, { alertObject: { alertVisible: !state.alertObject.alertVisible, alertMessage: action.alertMessage } })
  }
  return state
}

export default reducers
