import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import './style/App.css';
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import PrivateRoute from "./Components/routing/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";
import store from "./store";
import Alert from "./Components/layout/Alert";
import {useEffect} from "react";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import CreateProfile from "./Components/ProfileForms/CreateProfile";
import EditProfile from "./Components/ProfileForms/EditProfile";
import Profiles from "./Components/profiles/Profiles";
import Profile from "./Components/profile/Profile";
import Posts from './Components/posts/Posts';
import Post from "./Components/post/Post";

function App() {
    useEffect(()=>{
        setAuthToken(localStorage.getItem('token'));
        store.dispatch(loadUser());
    },[])
  return (
      <Provider store={store}>
          <Router>
              <>
                  <Navbar/>
                  <Switch>
                      <Route exact path='/'>
                          <Landing/>
                      </Route>
                      <section className='container'>
                          <Alert/>
                          <Route exact path='/login'>
                              <Login/>
                          </Route>
                          <Route exact path='/profiles'>
                              <Profiles/>
                          </Route>
                          <Route exact path='/profile/user/:id'>
                              <Profile/>
                          </Route>
                          <Route exact path='/register'>
                              <Register/>
                          </Route>
                          <Route exact path='/dashboard'>
                            <PrivateRoute component={Dashboard}/>
                          </Route>
                          <Route exact path='/posts/:id'>
                              <PrivateRoute component={Post}/>
                          </Route>
                          <Route exact path='/posts'>
                              <PrivateRoute component={Posts}/>
                          </Route>
                          <Route exact path='/create-profile'>
                              <PrivateRoute component={CreateProfile}/>
                          </Route>
                          <Route exact path='/edit-profile'>
                              <PrivateRoute component={EditProfile}/>
                          </Route>
                      </section>
                  </Switch>
              </>
          </Router>
          <footer style={{position:"absolute", bottom:0}}>
              <span className='text-light'>Made by Sukhman Sra</span>
              <br/>
              <span><a href='https://www.linkedin.com/in/sukhsra/' target="_blank" rel="noopener noreferrer"><u className='link-light'>LinkedIn</u></a></span>
              <br/>
              <span><a href='https://github.com/sukhmansra64' target="_blank" rel="noopener noreferrer"><u className='link-light'>GitHub</u></a></span>
          </footer>
      </Provider>
  );
}

export default App;
