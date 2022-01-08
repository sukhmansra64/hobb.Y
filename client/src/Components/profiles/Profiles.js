import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {getProfiles} from "../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfileItems from "./ProfileItems";

const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    useEffect(()=>{
        getProfiles();
    },[getProfiles]);
    return (
        loading ? <Spinner/>
            : <>
            <h1 className='large text-primary'>Hobbyists</h1>
            <p className='lead'>Explore and connect with other hobbyists</p>
            <div className='profiles'>
                {!loading && profiles.length > 0 ? profiles.map(profile => (<ProfileItems key={profile._id} profile={profile}/>)) : <h4>No users found</h4>}
            </div>
        </>
    );
};

Profiles.propTypes={
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
   profile: state.profile,
});

export default connect(mapStateToProps,{getProfiles})(Profiles);
