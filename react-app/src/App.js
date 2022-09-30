import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import * as deckActions from './store/deck';
import User from './components/User';
import { authenticate } from './store/session';
import Cards from './components/Cards/Cards';
import Decks from './components/Decks/Decks';
import DeckDetail from './components/Decks/DeckDetail';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(deckActions.getDecks())
}, [dispatch])

  const deckState = useSelector(state => state.decks)

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path='/test-cards'>
        <Cards />
        </Route>
        <Route path='/test-decks'>
          <Decks />
        </Route>
        <Route path='/decks/:id'>
          <DeckDetail decks={deckState}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
