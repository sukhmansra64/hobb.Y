import React from 'react';
import {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import propTypes from 'prop-types';

function Register({setAlert}) {
    const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            password2: ''
        })
    const {name, email, password, password2} = formData;

    const onChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(password!==password2){
            setAlert('Passwords do not match.','danger');
        }else{
            const newUser = {name, email, password};
            try{
                const res = await axios.post('/api/users',JSON.stringify(newUser),{headers:{'Content-Type':'application/json'}});
                console.log(res.data);
            }catch(err){
                console.log(err.response.data)
            }
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name"  value={name}  onChange={onChange} required/>
                </div>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    );
}

Register.propTypes={
    setAlert: propTypes.func.isRequired
}

export default connect(null,{setAlert})(Register);