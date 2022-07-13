import React, { useEffect, useState } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";

function ScreenSource() {
  /*------------------State--------------------*/
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    async function loadData() {
      // All sources
      let rawResponse = await fetch("https://newsapi.org/v2/top-headlines/sources?country=fr&apiKey=4b0ae722e5b742f89237f9b79b53467c");
      let response = await rawResponse.json();
      setSourceList(response.sources);
    }
    loadData();
  }, []);

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={`./images/${item.category}.png`} />
                }
                title={<a href={`/sources/${item.id}/articles`}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ScreenSource;
