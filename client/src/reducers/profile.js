import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    errors: {}
}

function profileReducer(state = initialState, action){
    const {payload, type} = action;

    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default profileReducer;