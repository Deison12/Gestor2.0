export const actionLogin = (userData: any) => {
  return {
    type: 'LOGIN',
    payload: userData,
  };
};

export const actionLogout = () => {
  return {
    type: 'LOGOUT',
  };
};
