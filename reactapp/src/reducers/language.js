export const language = (language = 'fr', action) => {
    if (action.type === "getLanguage") {
      return action.language;
    } else {
      return language;
    }
  };