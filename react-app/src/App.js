import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import * as deckActions from './store/deck';
import * as cardActions from './store/card';
import * as commentActions from './store/comment'
import User from './components/User';
import { authenticate } from './store/session';
import Cards from './components/Cards/Cards';
import Decks from './components/Decks/Decks';
import DeckDetail from './components/Decks/DeckDetail';
import EditComment from './components/Comments/EditComment';
import SplashPage from './components/Splash/SplashPage';
import Footer from './components/Footer/Footer';
import MyDecks from './components/UserPages/MyDecks';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(deckActions.getDecks());
      await dispatch(cardActions.getCards());
      await dispatch(commentActions.getComments());
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Footer />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        {/* <Route path='/test-cards'>
        <Cards />
        </Route> */}
        <Route path='/decks/:id'>
          <DeckDetail />
        </Route>
        <ProtectedRoute path='/my-decks'>
          <MyDecks />
        </ProtectedRoute>
        <ProtectedRoute path='/edit-comment/:id'>
          <EditComment />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
