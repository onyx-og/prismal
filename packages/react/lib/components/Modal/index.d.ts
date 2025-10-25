import './index.scss';
import { ReactNode, FC } from 'react';
import ComponentProps from '../Component';
/**
 * @typedef {object} ModalProps
 * @description Props for the Modal component.
 * @property {string} [areaId] The ID of the DOM element where the modal should be rendered (portaled).
 * @property {ReactNode} [header] Custom header content for the modal.
 * @property {ReactNode} [footer] Custom footer content for the modal.
 * @property {string} [bgClassName] Additional CSS class for the modal background overlay.
 * @property {string} [fgClassName] Additional CSS class for the modal foreground (the modal itself).
 * @property {string} [title] The title to be displayed in the modal header.
 * @property {ReactNode} [children] The main content of the modal.
 * @property {boolean} [visible=false] Controls the visibility of the modal.
 * @property {() => void} [closeModal] Callback function to close the modal.
 * @property {boolean} [showClose=true] If true, shows the close button in the header.
 */
export interface ModalProps extends ComponentProps {
    areaId?: string;
    header?: ReactNode;
    footer?: ReactNode;
    bgClassName?: string;
    fgClassName?: string;
    title?: string;
    children?: ReactNode;
    visible?: boolean;
    closeModal?: () => void;
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
