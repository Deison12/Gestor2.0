export const obtenerLocalStorage = () => {
  const user = localStorage.getItem('user')
  if (user === null) {
      return undefined
  }
  return JSON.parse(user)
}

export const guardarLocalStorage = (state: any) => {
  const user = JSON.stringify(state);
  localStorage.setItem('user', user);
}