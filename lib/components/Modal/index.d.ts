/// <reference types="react" />
import './index.scss';
import { ActionBarItemConfig } from 'components/ActionBar';
import ComponentProps from '../Component';
export interface ModalProps extends ComponentProps {
    areaId?: string;
    title?: string;
    children?: React.ReactNode;
    visible?: boolean;
    closeModal?: () => void;
    showClose?: boolean;
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    btmActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
