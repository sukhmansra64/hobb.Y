import React from 'react';
import {Link} from "react-router-dom";


const ProfileItems = ({
    profile:{
        user:{_id,name,avatar},
        work,
        location,
        hobbies
    }
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} className='round-img' alt=''/>
            <div>
                <h2>{name}</h2>
                <p>
                    {work && <span>Occupation: {work}</span>}
                </p>
                <p className='my-1'>
                    {location && <span>Located in: {location}</span>}
                </p>
                <Link to={`/profile/user/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                {hobbies.slice(0,4).map((hobby,index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check'/>
                        {hobby}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileItems;
