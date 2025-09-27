import './index.scss';
import { ReactNode, FC } from 'react';
import ComponentProps from '../Component';
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
declare const Modal: FC<ModalProps>;
export default Modal;
