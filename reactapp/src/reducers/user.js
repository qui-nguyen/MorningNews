export const userToken = (userToken = '', action) => {
    if (action.type === "saveToken") {
      return action.token;
    } else {
      return userToken;
    }
  };
  