import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import './style/App.css';
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import store from "./store";
import Alert from "./Components/layout/Alert";

function App() {
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
                      </Switch>
                  </section>
              </>
          </Router>
      </Provider>
  );
}

export default App;
