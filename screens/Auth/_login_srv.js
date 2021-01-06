import {ajax} from '../../utils/ajax';

export const SendMobile = (data) =>{
    return ajax(null,'/Auth/SendMobNumber','POST',true,data)
}
export const SendCode = (data,device,uuid) =>{
    return ajax(null,'/Auth/VerifyMobail','POST',true,data,device,uuid)
}