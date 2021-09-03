import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { login } from '../../actions/auth';
import propTypes from 'prop-types';


function Login({login,isAuthenticated}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData;

    const onChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        login(email,password)
        }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" onChange={onChange}/>
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    );
}

Login.propTypes = {
    login: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = (state) =>{
    return {isAuthenticated: state.auth.isAuthenticated}
}

export default connect(mapStateToProps,{login})(Login);