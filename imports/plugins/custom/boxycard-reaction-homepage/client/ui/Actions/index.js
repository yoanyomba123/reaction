import { UPDATE_UISTATE, UPDATE_SIDE_BAR_VISIBLE, UPDATE_LOGIN_MODAL_VISIBLE, UPDATE_ALERT } from "../ConstsRedux"

export const updateUIState = (uiState) => {
  return {
    type: UPDATE_UISTATE,
    uiState,
  }
}

export const updateSideBarVisible = (sideBarVisible) => {
  return {
    type: UPDATE_SIDE_BAR_VISIBLE,
    sideBarVisible,
  }
}

export const updateLoginModalVisible = (loginModalVisible) => {
  return {
    type: UPDATE_LOGIN_MODAL_VISIBLE,
    loginModalVisible,
  }
}

export const updateAlert = (alertMessage) => {
  const newAlertMessage = alertMessage || ''
  return {
    type: UPDATE_ALERT,
    alertMessage: newAlertMessage,
  }
}
