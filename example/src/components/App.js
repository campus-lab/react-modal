import React from 'react';

import {connect} from 'react-redux';
import {modalToggle} from '../actions';

import Modal from '../containers/Modal';

require("../../css/stylesheet.css");

let App = ({dispatch}) => {
    return (
        <div>
            <div className="examples">
                <h3>examples</h3>
                <div className="has-flyout">
                    <button type="button" className="button-primary" onClick={e => {dispatch(modalToggle('modal-foobar'))}}>try me</button>
                    <Modal id="modal-foobar" title="hello world">
                        hello
                    </Modal>
                </div>
            </div>
        </div>
    );
};

App = connect()(App);

export default App;
