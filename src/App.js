import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';

function App() {
  return (
   <Router>
    <Switch>
      <Route exact path="/" component={ScreenHome} />
      <Route path="/myarticles" component={ScreenMyArticles} />
      <Route exact path="/sources" component={ScreenSource} />
      <Route path="/sources/:sourceId/articles" component={ScreenArticlesBySource} />
    </Switch>
    </Router>

  );
}

export default App;
