import {ajax} from '../../utils/ajax';

export const getOptions = () =>{
    return ajax(null, '/Data/GetOptions', 'GET', false)
}

export const getUserProfile = () =>{
    return ajax('tokenJson', '/User/GetUserProfile', 'GET', false)
}

