import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {getProfileByID} from "../../actions/profile";

const ProfileTop = ({
                        profile:{
                            profile:{
                                user:{avatar,name},
                                work,
                                location,
                                links
                            }
                        }
}) => {
    return (
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                {work && <p className="lead"> {work} </p>}
                {location && <p>{location}</p>}
                {links && <div className="icons my-1">
                    {links.twitter &&
                    <a href={links.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>}

                    {links.facebook && <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>}
                    {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>}
                    {links.instagram && <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>}
                </div>}
            </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfileByID})(ProfileTop);
