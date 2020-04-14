import React, { Fragment } from 'react';

import { Modal, ModalHeader } from 'reactstrap';

const Popup = ({ toggle, toggleChange }) => {
    console.log(toggle);
    return (
        <Fragment>
            <Modal isOpen={toggle} toggle={toggleChange} className='modal-lg modal-dialog-centered'>
                <ModalHeader className="d-flex justify-content-end">
                    Invalid Size
                </ModalHeader>
            </Modal>
        </Fragment>
    );
}

export default Popup;