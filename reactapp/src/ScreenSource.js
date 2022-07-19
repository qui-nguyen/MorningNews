import React, { useEffect, useState } from "react";
import "./App.css";
import { List, Avatar, Button, Icon } from "antd";
import Nav from "./Nav";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ScreenSource(props) {
  /*------------------State--------------------*/
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    async function loadData(language) {
      // All sources
      let rawResponse = await fetch("/loadNews", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `language=${language}`,
      });
      let response = await rawResponse.json();
      console.log(response);
      setSourceList(response.sources);
    }
    loadData(props.language);
  
  }, [props.language]);

  if (props.token) {
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
   token: state.userToken,
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
