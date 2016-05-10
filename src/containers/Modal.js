import {connect} from 'react-redux';
import {modalToggle} from '../actions';
import _ from 'lodash';

import modalWrapper from '../../../src/modalWrapper';

const mapStateToProps = (state, ownProp) => {
    if (state.modalToggle.id === ownProp.id) {
        console.log('mapStateToProps', state, ownProp);
        return {
            open: state.modalToggle.open
        };
    }
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('mapDispatchToProps', ownProps);
    return {
        onWindowClick: () => { dispatch(modalToggle()) }
    }
}

const Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(modalWrapper);

export default Modal;
