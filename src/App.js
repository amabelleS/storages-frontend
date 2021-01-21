import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/navigation/MainNavigation';
import { useAuth } from './shared/hooks/auth-hook';
import {
  Storages,
  Storage,
  NewStorage,
  UpdateStorage,
  StorageItems,
  NewItem,
  UpdateItem,
} from './pages';
// import Storage from './pages/Storage';
// import NewStorage from './pages/NewStorage';
// import UpdateStorage from './pages/UpdateStorage';
// import StorageItems from './pages/StorageItems';
// import NewItem from './pages/NewItem';
// import UpdateItem from './pages/UpdateItem';
import Auth from './user/pages/Auth';
import UserInfo from './user/pages/UserInfo';

import { AuthContext } from './context/auth/Auth-context';
import GlobalStateProvider from './context/storages/GlobalStateProvider';

function App() {
  const { token, login, logout, userId, name } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Storages />
        </Route>
        <Route exact path="/userInfo/:uid">
          <UserInfo />
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
    <GlobalStateProvider>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          name: name,
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
    </GlobalStateProvider>
  );
}

export default App;
