import './index.scss';
import { ReactNode, FC } from 'react';
import ComponentProps from '../Component';
/**
 * @typedef {object} ModalProps
 * @description Props for the Modal component.
 */
export interface ModalProps extends ComponentProps {
    /** The ID of the DOM element where the modal should be rendered (portaled). */
    areaId?: string;
    /** Custom header content for the modal. */
    header?: ReactNode;
    /** Custom footer content for the modal. */
    footer?: ReactNode;
    /** Additional CSS class for the modal background overlay. */
    bgClassName?: string;
    /** Additional CSS class for the modal foreground (the modal itself). */
    fgClassName?: string;
    /** The title to be displayed in the modal header. */
    title?: string;
    /** The main content of the modal. */
    children?: ReactNode;
    /** Controls the visibility of the modal. */
    visible?: boolean;
    /** Callback function to close the modal. */
    closeModal?: () => void;
    /** If true, shows the close button in the header. */
    showClose?: boolean;
}
/**
 * @component Modal
 * @description A modal dialog component that can be rendered in a portal.
 * @param {ModalProps} props The component props.
 * @returns {React.ReactElement} The rendered Modal component.
 * @example
 * <Modal title="My Modal" visible={true} closeModal={() => {}}>
 *   <p>This is the modal content.</p>
 * </Modal>
 */
declare const Modal: FC<ModalProps>;
export default Modal;
