import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByID} from "../../actions/profile";
import {Link, useParams} from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

const Profile = ({getProfileByID, profile:{profile, loading}, auth}) => {
    const {id} = useParams();
    useEffect(()=>{
        getProfileByID(id);
    },[getProfileByID,id]);
    return (
        <>
            {profile === null || loading ? <Spinner/> : (<>
            <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                {auth.isAuthenticated&&auth.loading===false&&profile.user._id===auth.user._id&&(
                    <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
                )}
                <div className='profile-grid my-1'>
                    <ProfileTop/>
                    <ProfileAbout/>
                </div>
            </>)}
        </>
    );
};

Profile.propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileByID})(Profile);
