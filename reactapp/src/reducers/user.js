let initToken = localStorage.getItem("token");
export const userToken = (userToken = initToken, action) => {
    if (action.type === "saveToken") {
      return action.token;
    } else {
      return userToken;
    }
  };
