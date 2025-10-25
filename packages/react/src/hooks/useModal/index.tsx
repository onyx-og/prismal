import {
    useState, useCallback, FC, ReactElement
} from 'react';
import Modal, { ModalProps } from '../../components/Modal';

/**
 * @typedef {object} UseModalReturn
 * @description The return object of the useModal hook.
 * @property {FC<ModalProps>} Modal The Modal component, pre-configured with state management.
 * @property {boolean} state The current visibility state of the modal.
 * @property {() => void} open A function to open the modal.
 * @property {() => void} close A function to close the modal.
 */
type UseModalReturn = {
    Modal: FC<ModalProps>;
    state: boolean;
    open: () => void;
    close: () => void;
}
/**
 * @function useModal
 * @description A custom hook to manage the state of a Modal component.
 * @param {object} [config] Configuration for the modal.
 * @param {string} [config.areaId] The ID of the DOM element to render the modal into.
 * @returns {UseModalReturn} An object containing the Modal component and state management functions.
 * @example
 * const { Modal, open, close } = useModal();
 * <Button onClick={open}>Open Modal</Button>
 * <Modal title="My Modal">Content</Modal>
 */
const useModal = (
    config?: {areaId?: string}
): UseModalReturn => {
    const [ state, setState ] = useState(false);
    
    /**
     * @function close
     * @description Closes the modal.
     */
    const close = useCallback( () => {
        setState(false)
    }, []);

    /**
     * @function open
     * @description Opens the modal.
     */
    const open = useCallback( () => {
        setState(true)
    }, []);

    const _Modal: FC<ModalProps> = ( props ): ReactElement => <Modal areaId={config?.areaId} visible={state} closeModal={close} {...props}/>

    return { Modal: _Modal, state, open, close }
}

export default useModal;