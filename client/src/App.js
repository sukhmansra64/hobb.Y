import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";

function App() {
  return (
    <Router>
        <>
            <Navbar/>
            <Route exact path='/'>
                <Landing/>
            </Route>
            <section className='container'>
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
  );
}

export default App;
