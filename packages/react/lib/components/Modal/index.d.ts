import './index.scss';
import React from 'react';
import ComponentProps from '../Component';
export interface ModalProps extends ComponentProps {
    areaId?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    bgClassName?: string;
    fgClassName?: string;
    title?: string;
    children?: React.ReactNode;
    visible?: boolean;
    closeModal?: () => void;
    showClose?: boolean;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
