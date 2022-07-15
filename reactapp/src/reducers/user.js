export const userToken = (userToken = '', action) => {
    if (action.type === "getToken") {
      return action.token;
    } else {
      return userToken;
    }
  };
  