
const INIT_STATE:any = {
  user: null,
};

export const authReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          user: action.payload
        };
      case "LOGOUT":
        return {
          ...state,
          user: null
        };
      default:
        return state;
  }
}
