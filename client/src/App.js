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
                  <Route exact path='/'>
                      <Landing/>
                  </Route>
                  <section className='container'>
                      <Alert/>
                      <Switch>
                          <Route exact path='/login'>
                              <Login/>
                          </Route>
                          <Route exact path='/register'>
                              <Register/>
                          </Route>
                          <PrivateRoute component={Dashboard}/>
                      </Switch>
                  </section>
              </>
          </Router>
      </Provider>
  );
}

export default App;
