
import React,{useEffect} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import {getCurrentProfile} from '../../actions/profile';

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};


function Dashboard({auth, profile, getCurrentProfile}) {
    useEffect(()=>{getCurrentProfile()},[])
    if(!auth.isAuthenticated) return(<Redirect to='/login'/>)
    return (
        <div>Dashboard</div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});



export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);