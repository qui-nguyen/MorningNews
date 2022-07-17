import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

function Nav(props) {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="sources">
          <Link to="/sources"><Icon type="home" />Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/myarticles"><Icon type="read" />My Articles</Link>
        </Menu.Item>

        <Menu.Item key="app">
          <a href="/" onClick={()=> localStorage.clear()}
          ><Icon type="logout"/>Logout</a>
        </Menu.Item>

      </Menu>
    </nav>
  );
}


export default Nav;