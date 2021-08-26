import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


function Login() {
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
            const user = {email, password};
            try{
                const res = await axios.post('/api/auth',JSON.stringify(user),{headers:{'Content-Type':'application/json'}});
                console.log(res.data);
            }catch(err){
                console.log(err.response.data)
            }
        }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
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

export default Login;