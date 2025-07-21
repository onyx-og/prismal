import React from 'react';
import Modal, { ModalProps } from 'components/Modal';

/**
 * Custom hook meant to export a Modal component and the methods to manage its state
 * This allows to provide the Modal component with headers, footers or content that can already alter that state
 * Also to ease the management of the state from other components outside the Modal.
 */
const useModal = (
    areaId?: string
) => {
    const [ state, setState ] = React.useState(false);
    
    /**
     * Closes the modal
     */
    const close = React.useCallback( () => {
        setState(false)
    }, []);

    /**
     * Opens the modal
     */
    const open = React.useCallback( () => {
        setState(true)
    }, []);

    // NOTE: the 'state' boolean may not be needed to exported since it is already
    // used internally in Modal component 

    // Alter the component to keep the props that will be passed
    // but the visibility will be managed from open, state and close
    const _Modal: React.FC<ModalProps> = ( props ) => <Modal areaId={areaId} visible={state} closeModal={close} {...props}/>

    return { Modal: _Modal, state, open, close }
}

export default useModal;