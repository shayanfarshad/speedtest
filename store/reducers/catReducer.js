import {set_cat_id} from '../actions/catActions';

const catState = {
    selectedCatId: 2
};

export const catHandler = (state = catState, action)=>{
    switch (action.type) {
        case set_cat_id:
            return {...state, selectedCatId: action.payload}
        default:
            return state
    }
};