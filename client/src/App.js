import React from 'react';
import './assets/scss/App.scss';
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import SMContainer from './components/shared/SMContainer';
import { routes } from './routes';

function App() {
  return (
    <div className="App wrapper">
      <Router>
        <div className="main-content">
          <Switch>
            {routes.map(({ Component, path, routes, redirectTo }, key) => {
              if (redirectTo) {
                return (<Redirect key={key} to={{ pathname: redirectTo }} />)
              }
              return (<SMContainer Component={Component} path={path} routes={routes} key={key} />)
            })}
            <Route>
              <Redirect to={{ pathname: '/home' }} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
