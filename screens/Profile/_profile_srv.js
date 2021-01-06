import {ajax} from '../../utils/ajax';

export const setProfileChange = (data) =>{
    return ajax('tokenJson', '/User/UpdateUserProfile', 'POST', true,data)
}

export const getUserProfile = () =>{
    return ajax('tokenJson', '/User/GetUserProfile', 'GET', false)
}


export const updateUserImage = (data) =>{
    return ajax('tokenFormData', '/User/UpdateUserImage', 'POST', true,data)
}