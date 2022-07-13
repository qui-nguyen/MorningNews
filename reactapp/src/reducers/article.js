export const myArticles = (myArticles = [], action) => {
  if (action.type === "addArticle") {
    let isExist = myArticles.filter((a) => a.title === action.article.title);
    let result = isExist.length === 1 ? myArticles : [...myArticles, action.article];
    return result;
  } else if (action.type === "deleteArticle") {
    return myArticles.filter((t) => t.title !== action.title);
  } else {
    return myArticles;
  }
};
