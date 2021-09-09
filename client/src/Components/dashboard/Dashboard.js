import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';

Dashboard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function Dashboard({isAuthenticated}) {
    if(!isAuthenticated) return(<Redirect to='/login'/>)
    return (
        <div>Dashboard</div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps)(Dashboard);