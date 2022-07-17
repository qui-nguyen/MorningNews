import React, { useEffect, useState } from "react";
import "./App.css";
import { List, Avatar, Button, Icon } from "antd";
import Nav from "./Nav";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ScreenSource(props) {
  /*------------------State--------------------*/
  const [sourceList, setSourceList] = useState([]);
  let localStorageToken = localStorage.getItem("token");

  useEffect(() => {
    async function loadData() {
      // All sources
      let rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?country=${props.language}&apiKey=4b0ae722e5b742f89237f9b79b53467c`
      );
      let response = await rawResponse.json();
      setSourceList(response.sources);
    }
    loadData();
  
  }, [props.language]);

  if (localStorageToken) {
    return (
      <div>
        <Nav />
        <div className="Banner">
          <img src="./images/fr.jpg" onClick={() => props.chooseLanguage("fr")} />
          <img
            src="./images/usa.jpg"
            onClick={() => props.chooseLanguage("us")}
          />
        </div>
        <div className="HomeThemes">
          <List
            itemLayout="horizontal"
            dataSource={sourceList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`./images/${item.category}.png`} />}
                  title={
                    <Link to={`/sources/${item.id}/articles`}>{item.name}</Link>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
  else{
    return (
      /*
      <div>
      <Nav></Nav>
      <div className="Banner">
          <img src="./images/fr.jpg" onClick={() => props.chooseLanguage("fr")} />
          <img
            src="./images/usa.jpg"
            onClick={() => props.chooseLanguage("us")}
          />
        </div>
        <div className="HomeThemes">
          <h1>You are not connected</h1>
        </div>
        </div>
        */
       <Redirect to="/" />
    )
  }
 
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
   // token: state.userToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseLanguage: function (language) {
      dispatch({
        type: "getLanguage",
        language: language,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
