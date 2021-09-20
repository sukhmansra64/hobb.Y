import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';

Dashboard.propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
};


function Dashboard({isAuthenticated, user}) {
    const getUserName = () =>{
        if (user){
           return(user.name);
        }
    }
    if(!isAuthenticated) return(<Redirect to='/login'/>)
    return (
        <section className="container">
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {getUserName()}</p>
            <div className="dash-buttons">
                <a href="create-profile.html" className="btn btn-light"
                ><i className="fas fa-user-circle text-primary"></i> Edit Profile</a
                >

            </div>

            <div className="my-2">
                <button className="btn btn-danger">
                    <i className="fas fa-user-minus"></i>

                    Delete My Account
                </button>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps)(Dashboard);