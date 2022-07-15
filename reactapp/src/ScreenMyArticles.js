import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";

import { connect } from "react-redux";
const { Meta } = Card;

function ScreenMyArticles(props) {

  useEffect(() => {
    const loadData = async (token) => {
      let rawResponse = await fetch("/getMyWishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${token}`,
      });
      let response = await rawResponse.json();
      if(response){
        props.getWishList(response);
      }
    };
    loadData(props.token);
  }, []);

  const deleteFromWishList = async (title, token) => {

    let rawResponse = await fetch("/deleteArticleWishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&title=${title}`,
    });
    let response = await rawResponse.json();
    console.log(response.isDeleteOk);
    if (response.isDeleteOk) {
      props.deleteFromWishListFront(title);
    }

  }

  const articles = props.myArticles.map((article, i) => {
    return (
      <div
        key={article.title}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          style={{
            width: 300,
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          cover={<img alt="example" src={article.img} />}
          actions={[
            <Icon type="read" key="ellipsis2" />,
            <Icon
              type="delete"
              key="ellipsis"
              onClick={() => deleteFromWishList(article.title, props.token)}
            ></Icon>,
          ]}
        >
          <Meta title={article.title} description={article.description} />
        </Card>
      </div>
    );
  });
  if (props.myArticles.length === 0) {
    return (
      <div>
        <Nav />
        <div className="Banner" />
        <h1 style={{textAlign:"center", margin:200, color:'red', fontStyle:"italic"}}>
          No articles
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <Nav />
        <div className="Banner" />
        <div className="Card">{articles}</div>
      </div>
    );
  }
}

/*--------------Component container----------------------*/
function mapStateToProps(state) {
  return { 
    myArticles: state.myArticles,
    token: state.userToken,
   };
} 

function mapDispatchToProps(dispatch) {
  return {
    deleteFromWishListFront: function (title) {
      dispatch({ type: "deleteArticle", title: title });
    },
    getWishList: function (myArticlesDB) {
      dispatch({ type: "getArticlesDB", articles: myArticlesDB });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
