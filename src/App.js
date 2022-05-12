import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    const user = getUser();

    if (user) {
      setToken(user.access_token);
      setEmail(user.user.email);
    }
  }, []);

  async function handleLogout() {
    // call the logout function
    await logout();
    setEmail('');
    setToken('');
    // clear the user in state
  }

  return (
    <Router>
      <div className="App">
        <header>
          {token && (
            <>
              <NavLink exact className="active-link" to="/board-games">
                Board Game List
              </NavLink>
              <NavLink exact className="active-link" to="/create">
                Create A Game
              </NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          <p>{email}</p>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {token ? (
                <Redirect to="/board-games" />
              ) : (
                <AuthPage setEmail={setEmail} setToken={setToken} />
              )}
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
            </Route>
            <Route exact path="/board-games">
              {token ? <ListPage /> : <Redirect to="/" />}
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/board-games/:id">
              {token ? <DetailPage /> : <Redirect to="/" />}
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/create">
              {token ? <CreatePage /> : <Redirect to="/" />}
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
