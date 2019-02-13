const TokenKey = 'STDTOKEN'

export function getToken () {
  return window.localStorage.getItem(TokenKey)
}

export function setToken (token) {
  window.localStorage.setItem(TokenKey, token)
  return true
}

export function removeToken () {
  window.localStorage.removeItem(TokenKey)
}
