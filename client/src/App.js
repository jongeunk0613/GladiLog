import React from 'react';
import { Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import WritePost from './pages/WritePost';
import Base from './components/Base';
import Post from './pages/Post';
import './App.css';

function App() {

  return (
    <div className="App">
        <Base>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/auth/signup" exact component={SignUp} />
                <Route path="/auth/signin" exact component={SignIn} />
                <Route path="/post/write" exact component={WritePost} />
                <Route path="/post/:id" exact component={Post} />
            </Switch>
        </Base>
    </div>
  );
}

export default App;