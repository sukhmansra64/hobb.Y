import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {logout} from '../../actions/auth';



const Navbar = ({logout, auth: {isAuthenticated, loading}}) =>{
    const userLinks = () =>{
        return(
            <>
                <ul>
                    <li><Link to="/profiles">Hobbyists</Link></li>
                    <li><Link to='/posts'>Posts</Link></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li>
                        <a href='#!' onClick={logout}>
                            <i className='fas fa-sign-out-alt'></i>
                            <span className='hide-sm'>logout</span>
                        </a>
                    </li>
                </ul>
            </>
        )
    }
    const guestLinks = () =>{
        return(
            <>
                <ul>
                    <li><Link to="/profiles">Hobbyists</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </>
        )
    }
    return(
        <>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-guitar"></i> hobb.Y</Link>
                </h1>
                <ul>
                    {isAuthenticated ? userLinks() : guestLinks()}
                </ul>
            </nav>
        </>
    )
}

Navbar.propTypes = {
    auth: propTypes.object.isRequired,
    logout: propTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    auth : state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);