import React from 'react';
import './assets/scss/App.scss';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SMContainer from './components/shared/SMContainer';
import Auth from './components/auth';
import { routes } from './routes';

function App() {
  return (
    <div className="App wrapper">
      <Router>
        <Switch>
          {routes.map(({ Component, path, routes, redirectTo }, key) => {
            if (redirectTo) {
              return (<Redirect key={key} to={{ pathname: redirectTo }} />)
            }
            return (<SMContainer Component={Component} path={path} routes={routes} key={key} />)
          })}
          <Route path="/login" exact render={(props) => {
            return <Auth {...props} />
          }} />
          <Route>
            <Redirect to={{ pathname: '/home' }} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
