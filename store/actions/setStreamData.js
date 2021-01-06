
export const set_Stream_Data = 'set_Stream_Data';

export default params => async dispatch => {
    const { perf } = params;
    // console.log('perf',perf)
    var obj = new Object();
    obj.perf = perf;
    dispatch(setStreamData(obj))
}

const setStreamData = data => ({
    type: set_Stream_Data,
    payload: data
});