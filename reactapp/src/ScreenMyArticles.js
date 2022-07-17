import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const { Meta } = Card;

function ScreenMyArticles(props) {
  /*-----------------------------Modal---------------------------------- */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const showModal = (title, content) => {
    setModalContent({
      title: title,
      content: content,
    });

    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /*--------------------------Load Data from DB wishlist---------------------------- */
  useEffect(() => {
    const loadData = async (token) => {
      let rawResponse = await fetch("/getMyWishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${token}`,
      });
      let response = await rawResponse.json();
      if (response) {
        props.getWishList(response);
      }
    };
    loadData(props.token);
  }, []);

  /*--------------------------Delete article from DB wishlist---------------------------- */
  const deleteFromWishList = async (id, token) => {
    let rawResponse = await fetch("/deleteArticleWishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&id=${id}`,
    });
    let response = await rawResponse.json();
    //console.log(response.isDeleteOk);

    /*--------------------Delete article from state (redux-store) of Front-------------- */
    if (response.isDeleteOk) {
      props.deleteFromWishListFront(id);
    }
  };

  console.log(props.myArticles);

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
            <Icon
              type="read"
              key="ellipsis2"
              onClick={() => showModal(article.title, article.content)}
            />,
            <Icon
              type="delete"
              key="ellipsis"
              onClick={() => deleteFromWishList(article._id, props.token)}
            ></Icon>,
          ]}
        >
          <Meta
            title={
              <a href={article.url} target="_blank">
                {article.title}
              </a>
            }
            description={article.description}
          />
        </Card>
      </div>
    );
  });

  if (props.token) {
    if (props.myArticles.length === 0) {
      return (
        <div>
          <Nav />
          <div className="Banner" />
          <h1
            style={{
              textAlign: "center",
              margin: 200,
              color: "red",
              fontStyle: "italic",
            }}
          >
            No articles
          </h1>
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          <Modal
            title={modalContent.title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>{modalContent.content}</p>
          </Modal>
          <div className="Banner" />
          <div className="Card">{articles}</div>
        </div>
      );
    }
  } else {
    return (
      /*
      <div>
        <Nav></Nav>
        <div className="Banner"></div>
        <div className="HomeThemes">
          <h1>You are not connected</h1>
        </div>
      </div>
      */
     <Redirect to="/" />
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
    deleteFromWishListFront: function (id) {
      dispatch({ type: "deleteArticle", id: id });
    },

    getWishList: function (myArticlesDB) {
      dispatch({ type: "getArticlesDB", articles: myArticlesDB });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
