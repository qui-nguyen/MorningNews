import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { Card, Icon, Modal } from "antd";

import Nav from "./Nav";

const { Meta } = Card;

function ScreenArticlesBySource() {
  let { sourceId } = useParams();

  /*--------------------------Articles----------------------------- */
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=4b0ae722e5b742f89237f9b79b53467c`
      );
      const response = await rawResponse.json();
      setArticleList(response.articles);
    };
    loadData();
  }, []);
  /*--------------------------Modal----------------------------- */
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

  let listArticles = articleList.map((article, index) => {
    return (
      <Card
        key={index}
        style={{
          width: 300,
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        cover={<img alt="example" src={article.urlToImage} />}
        actions={[
          <Icon
            type="read"
            key="ellipsis2"
            onClick={() => showModal(article.title, article.content)}
          />,
          <Icon type="like" key="ellipsis" />,
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
    );
  });

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

      <div className="Card">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {listArticles}
        </div>
      </div>
    </div>
  );
}

export default ScreenArticlesBySource;
