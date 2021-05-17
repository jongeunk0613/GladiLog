import React, { useState, useEffect } from 'react';
import {Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import WritePost from './pages/WritePost';
import Base from './components/Base';
import './App.css';

function App() {

  return (
    <div className="App">
        <Base>
            <Route path="/" exact component={Main} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/auth/signin" exact component={SignIn} />
            <Route path="/post/write" exact component={WritePost} />
        </Base>
    </div>
  );
}

export default App;