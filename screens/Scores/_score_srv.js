import {ajax} from '../../utils/ajax';

export const GetUserScore = () =>{
    return ajax('tokenJson', '/User/GetUserScore', 'GET', true,)
}



export const GetPackages = () =>{
    return ajax('', '/Data/GetPackages', 'GET', true)
}


export const GetMainScore = () =>{
    return ajax('', '/Data/GetMainScore', 'GET', true)
}
