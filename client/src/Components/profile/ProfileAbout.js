import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const ProfileAbout = ({
profile:{
    profile: {
        user,
            bio,
            hobbies
    }
}
}) => {
    return (
        <>
            <div className="profile-about bg-light p-2">
                {bio && <h2 className="text-primary">{user.name.trim().split(' ')[0]}'s Bio</h2>}
                {bio && <p>
                    {bio}
                </p>}
                <div className="line"></div>
                <h2 className="text-primary">Hobbies</h2>
                <div className="skills">
                    {hobbies.map((hobby,index)=>(
                        <div key={index} className='p-1'>
                            <i className='fas fa-check'/> {hobby}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    profile: state.profile
});

export default connect(mapStateToProps)(ProfileAbout);
