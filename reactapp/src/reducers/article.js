export const myArticles = (myArticles = [], action) => {
  /*--Action add a new article--*/
  if (action.type === "addArticle") {
    let isExist = myArticles.filter((a) => a.title === action.article.title);
    let result = isExist.length === 1 ? myArticles : [...myArticles, action.article];
    return result;
  } 
  
    /*--Action delete a article--*/
  if (action.type === "deleteArticle") {
    return myArticles.filter((t) => t.title !== action.title);
  }
  
  if (action.type === "getArticlesDB") {
    let copyMyArticles = [...myArticles]; 

    action.articles.forEach(article => {
      let foundArticle = copyMyArticles.filter(a => a.title === article.title).length;
      if(foundArticle === 0){
        copyMyArticles.push({
          title: article.title,
          description: article.desc,
          content: article.content,
          img: article.img,
          url: article.url
        });
      }
    });

    return copyMyArticles;
  } 

  return myArticles;
};