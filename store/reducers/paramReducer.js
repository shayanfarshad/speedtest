import { set_Upload_Data, set_Download_Speed, set_Upload_Speed, set_Download_Max, set_Country_Code } from '../actions/paramAction';
import { set_Browsing_Data } from '../actions/setBrowsingData';
import { set_Stream_Data } from '../actions/setStreamData'

const paramState = {
    dataParam: {},
    lastDownloadSpeed: '',
    countryCode: '',
    maxDownloadSpeed:'',
    lastUpSpeed: '',
    streamData: {},
    browsingData: {}
};

export const paramHandler = (state = paramState, action) => {
    // {console.log('video obj',action)}
    switch (action.type) {

        case set_Upload_Data:
            return { ...state, dataParam: action.payload }

        case set_Download_Speed:
            return { ...state, lastDownloadSpeed: action.payload }
        case set_Download_Max:
            return { ...state, maxDownloadSpeed: action.payload }
        case set_Upload_Speed:
            return { ...state, lastUpSpeed: action.payload }

        case set_Browsing_Data:
            return { ...state, browsingData: action.payload }

        case set_Stream_Data:
            return { ...state, streamData: action.payload }
        case set_Country_Code:
            return { ...state, countryCode: action.payload }
        default:
            return state
    }
};