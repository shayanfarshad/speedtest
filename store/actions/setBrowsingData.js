export const set_Browsing_Data = 'set_Browsing_Data';

export default params => async dispatch => {
    const { perf } = params;

    var obj = new Object();
    obj.perf = perf;
    dispatch(setBrowsingData(obj))
}
const setBrowsingData = data => ({
    type: set_Browsing_Data,
    payload: data
});