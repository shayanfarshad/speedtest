import { get_Profile_Data, set_Profile_Data, set_Profile_Img, set_User_Score } from '../actions/userAction';
import { set_location } from '../actions/locationAction'

const userState = {
    profile: {},
    profileImg: '',
    location: [],
    userScore: ''
};

export const userHandler = (state = userState, action) => {
    // console.log('user score is', action.payload)
    switch (action.type) {
        case set_User_Score:
            return { ...state, userScore: action.payload }
        case set_Profile_Data:
            return { ...state, profile: action.payload }
        case set_Profile_Img:
            return { ...state, profileImg: action.payload }
        case set_location:
            return { ...state, location: action.payload }
        default:
            return state
    }
};