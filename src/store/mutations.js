export function setLogin (state, { data }) {
  state.loginUser = data
}

export function setAddr (state, { data }) {
  state.addr = data
}

export function setEditAddr (state, { data }) {
  state.editAddr = data
}

export function setSessionAddr (state, { data }) {
  state.sessionAddr = data
}

export function setlistIndex (state, { data }) {
  state.listIndex = data
}
export function setUserScore (state, { data }) {
  state.loginUser.points = data
}

export function setReturnType (state, { data }) {
  state.chosenReturnType = data
}

export function updateAppSetting (state, { data }) {
  state.allowBack = data
}

export function setPayConfirmShow (state, { data }) {
  state.payConfirmShow = data
}

export function setIsCash (state, { data }) {
  state.isCashCart = data
}

export function setGoHome (state, { data }) {
  state.home = data
}

export function setTime (state, { data }) {
  state.server_time = data
}

export function changeTime (state, { data }) {
  state.server_time +=1000
}

export function setScreen (state, { data }) {
  state.screen =data
}