import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Search from './Search';
import Spinner from 'react-bootstrap/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [doneFirstLoad, setDoneFirstLoad] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const refreshUser = useCallback(() => {
    return fetch('/user')
      .then(response => response.json())
      .then(user => {
        setLoading(false);
        setUser(user);

        if (!user) {
          history.push('/login');
        }
      });
  }, [history, setUser, setLoading]);

  useEffect(() => {
    const intervalID = setInterval(refreshUser, 5000);

    return () => {
      clearInterval(intervalID);
    };
  }, [refreshUser]);

  useEffect(() => {
    if (!doneFirstLoad || location.pathname === '/') {
      refreshUser();
      setDoneFirstLoad(true);
    }
  }, [location.pathname, refreshUser]);

  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <img alt="The DSB logo" src="/dsb.svg" width={48} height={48} />
        </Link>
        <h1>Definitely Secure Bank</h1>
      </div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Switch>
        <Route path="/login">
          <Login user={user} />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home user={user} setUser={setUser} />
        </Route>
      </Switch>
      <div className="footer">
        <p>
          Source code available on{' '}
          <a
            href="https://github.com/vzhou842/definitely-secure-bank"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          .
        </p>
        <p>
          Built by{' '}
          <a href="https://victorzhou.com" target="_blank">
            Victor Zhou
          </a>{' '}
          for demo purposes.
        </p>
        <p>
          See:{' '}
          <b>
            <a href="https://victorzhou.com/blog/csrf/">CSRF Demo</a>
          </b>
        </p>
      </div>
    </div>
  );
}

export default App;
