import React, { useState, useEffect } from 'react';
import {Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Base from './components/Base';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
        <Base>
            <Route path="/" exact render={() => <p>The current time is {currentTime}.</p>} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/auth/signin" exact component={SignIn} />
        </Base>
    </div>
  );
}

export default App;