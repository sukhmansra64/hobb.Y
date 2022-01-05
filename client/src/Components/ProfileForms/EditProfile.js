import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import {createProfile, getCurrentProfile} from "../../actions/profile";
import PropTypes from "prop-types";

const initialState = {
    work: '',
    location: '',
    hobbies: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
};


const EditProfile = ({profile:{profile, loading} ,history,createProfile, getCurrentProfile}) => {
    const [formData, setFormData] = useState(initialState);
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
        work,
        location,
        hobbies,
        bio,
        twitter,
        facebook,
        youtube,
        instagram
    } = formData;

    useEffect(()=>{
        getCurrentProfile();

        setFormData({
            work: loading||!profile.work ? '': profile.work,
            location: loading||!profile.location ? '': profile.location,
            hobbies: loading||!profile.hobbies ? '': profile.hobbies.join(', '),
            bio: loading||!profile.bio ? '': profile.bio,
            twitter: loading||!profile.links.twitter ? '': profile.links.twitter,
            facebook: loading||!profile.links.facebook ? '': profile.links.facebook,
            youtube: loading||!profile.links.youtube ? '': profile.links.youtube,
            instagram: loading||!profile.links.instagram ? '': profile.links.instagram
        })
    },[loading])

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) =>{
        e.preventDefault();
        createProfile(formData,history, true);
    }

    return (
        <>
            <section className="container">
                <h1 className="large text-primary">
                    Edit Your Profile
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's change your
                    profile to your liking.
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Work" name="work" onChange={e => onChange(e)} value={work}/>
                        <small className="form-text"
                        >A short description of your occupation</small
                        >
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" onChange={e => onChange(e)} value={location}/>
                        <small className="form-text"
                        >City & state suggested (eg. Toronto, ON)</small
                        >
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Hobbies" name="hobbies" onChange={e => onChange(e)} value={hobbies}/>
                        <small className="form-text"
                        >Please use comma separated values (eg.
                            Hockey, Guitar, Jump Rope, Coding)</small
                        >
                    </div>

                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio" onChange={e => onChange(e)} value={bio}></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                            Add Social Network Links
                        </button>
                        <span>(Optional*)</span>
                    </div>
                    {displaySocialInputs&& <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" onChange={e => onChange(e)} value={twitter}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" onChange={e => onChange(e)} value={facebook}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" onChange={e => onChange(e)} value={youtube}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" onChange={e => onChange(e)} value={instagram}/>
                        </div>
                    </>}
                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </section>
        </>
    );
};

EditProfile.propTypes ={
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
   profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
