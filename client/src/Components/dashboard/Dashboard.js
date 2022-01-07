import React,{useEffect} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {getCurrentProfile, deleteProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from "./DashboardActions";

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteProfile: PropTypes.func.isRequired
};


function Dashboard({auth:{user}, profile:{profile,loading}, getCurrentProfile, deleteProfile}) {
    useEffect(()=>{getCurrentProfile()},[getCurrentProfile]);
    return loading && profile === null ? (
        <Spinner/>
    ) : (
        <>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'/>  Welcome {user && user.name}
            </p>
            {
                profile !== null ? (
                    <>
                        <DashboardActions/>
                        <div className='my-2' onClick={()=>{deleteProfile()}}>
                            <button className='btn btn-danger' >
                                <i className='fas fa-user'></i>
                                Delete Account
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>You have not created a profile yet, please create one.</p>
                        <Link className='btn btn-primary my-1' to='/create-profile'>Create Profile</Link>
                        <div className='my-2' onClick={()=>{deleteProfile()}}>
                            <button className='btn btn-danger'>
                                <i className='fas fa-user'></i>
                                Delete Account
                            </button>
                        </div>
                    </>
                )
            }
        </>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});


export default connect(mapStateToProps, {getCurrentProfile, deleteProfile})(Dashboard);