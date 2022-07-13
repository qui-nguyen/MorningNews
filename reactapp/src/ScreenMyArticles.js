import React from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";

import { connect } from "react-redux";
const { Meta } = Card;

function ScreenMyArticles(props) {
  //console.log(props.myArticles);

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
              onClick={() => props.deleteFromWishList(article.title)}
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

/*------------------------------------*/
function mapStateToProps(state) {
  return { myArticles: state.myArticles };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFromWishList: function (title) {
      dispatch({ type: "deleteArticle", title: title });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
