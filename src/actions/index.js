import * as types from '../constants/ActionTypes'

export const modalToggle = (id) => {
    console.log('action modalToggle:', id);
    return {type: types.MODAL_TOGGLE, id: id};
};
