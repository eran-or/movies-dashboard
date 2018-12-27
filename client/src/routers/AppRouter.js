
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'

const AppRouter = (props) => (
  // <Router basename="/comment-feed/">
  <Router>
    <div>
      <Switch>
        <Route path="/" component={Home} exact={true} />
      </Switch>
    </div>
  </Router >
);

export default AppRouter