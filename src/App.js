import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/navigation/MainNavigation';
import { useAuth } from './shared/hooks/auth-hook';
import Storages from './pages/Storages';
import Storage from './pages/Storage';
import NewStorage from './pages/NewStorage';
import UpdateStorage from './pages/UpdateStorage';
import StorageItems from './pages/StorageItems';
import NewItem from './pages/NewItem';
import UpdateItem from './pages/UpdateItem';
import Auth from './user/pages/Auth';

import { StorageState } from './context/storages/StorageState';
import { AuthContext } from './context/auth/Auth-context';

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Storages />
        </Route>

        <Route exact path="/storages/new">
          <NewStorage />
        </Route>
        <Route exact path="/:sid">
          <Storage />
        </Route>
        <Route exact path="/:sid/update">
          <UpdateStorage />
        </Route>
        <Route exact path="/:sid/items">
          <StorageItems />
        </Route>
        <Route exact path="/:sid/items/new">
          <NewItem />
        </Route>
        <Route exact path="/:sid/items/:itemId/update">
          <UpdateItem />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Storages />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/:sid">
          <Storage />
        </Route>
        <Route exact path="/:sid/items">
          <StorageItems />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <StorageState>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          userId: userId,
        }}
      >
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </StorageState>
  );
}

export default App;
