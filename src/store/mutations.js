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
  state.loginUser.score = data
}

export function setReturnType (state, { data }) {
  state.chosenReturnType = data
}