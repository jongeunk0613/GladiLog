import React from 'react';
import { Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import PostWrite from './pages/PostWrite';
import Base from './components/Base';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import Auth from './lib/Auth';
import './App.css';

function App() {

  return (
    <div className="App">
        <Base>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/auth/signup" exact component={SignUp} />
                <Route path="/auth/signin" exact component={SignIn} />
                <Route path="/post/write" exact component={() => <Auth PageComponent={PostWrite} />} />
                <Route path="/post/:postID" exact component={PostDetail} />
                <Route path="/post/edit/:postID" exact component={() => <Auth PageComponent={PostEdit} />} />
            </Switch>
        </Base>
    </div>
  );
}

export default App;