import React from 'react';

import {connect} from 'react-redux';
import {modalToggle} from '../actions';

import Modal from '../containers/Modal';

require("../../css/stylesheet.css");

let App = ({dispatch}) => {
    return (
        <div>
            <div className="examples">
                <h3>example</h3>
                <button type="button" className="button-primary" onClick={e => {dispatch(modalToggle('modal-foobar'))}}>try me</button>
                <Modal id="modal-foobar" title="react-modal example">
                    <div>
                        <p>hello world</p>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

App = connect()(App);

export default App;
