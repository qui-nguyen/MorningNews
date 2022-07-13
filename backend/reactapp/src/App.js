import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScreenHome from "./ScreenHome";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";
import ScreenArticlesBySource from "./ScreenArticlesBySource";

import {myArticles} from "./reducers/article";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(combineReducers({ myArticles }));

function App() {
  //console.log(store.getState());
  return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={ScreenHome} />
            <Route exact path="/sources" component={ScreenSource} />
            <Route path="/myarticles" component={ScreenMyArticles} />
            <Route
              path="/sources/:sourceId/articles"
              component={ScreenArticlesBySource}
            />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
