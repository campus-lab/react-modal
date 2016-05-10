import { FLYOUT_TOGGLE } from '../constants/ActionTypes'

const initialState = {
    id: null,
    open: false
};

const modalToggle = (state = initialState, action) => {
    switch (action.type) {
    case 'MODAL_TOGGLE':
        console.info('reducer modalToggle:', state, action);
        let s;

        if (!state.id || state.id === action.id) { // first toggle / same modal: toggle
            s = !state.open;
        } else if (typeof action.id === 'undefined') { // window click: close
            s = false;
        } else { // different modal: open
            s = true;
        }

        return Object.assign({}, state, {
            id: action.id,
            open: s
        });
    default:
        console.info('reducer modalToggle DEFAULT:', state);
        return state;
    }
};

export default modalToggle;
