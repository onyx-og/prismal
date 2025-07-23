import './index.scss';

import ActionBar, { ActionBarItemConfig } from 'components/ActionBar';
import Button from 'components/Button';
import ReactDOM from 'react-dom';
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
};

const Modal: React.FC<ModalProps> = (props) => {
    const {
        areaId,
        title,
        children,
        visible = false,
        topActionBarItems, btmActionBarItems,
        closeModal,
        showClose = true,
        className,
        accent, accentDark, accentLight,
    } = props;

    let modalClass = 'prismal-modal';

    if (visible) modalClass = `${modalClass} visible`;
    if (className) modalClass = `${modalClass} ${className}`;

    let modalFgClass = 'modal-fg'; // The modal
    let modalBgClass = 'modal-bg'; // Mask

    const modalArea = areaId ? document.getElementById(areaId) : undefined;

    const content = <div className={modalClass}>
        <div className={modalBgClass} onClick={closeModal}></div>
        <div className={modalFgClass}>
            <ActionBar position='top'
                items={[
                    title ? { item: <span>{title}</span>, position: 'center', key: 'modal-title', scale: false } : null,
                    ...(topActionBarItems instanceof Function && topActionBarItems() || topActionBarItems instanceof Array && topActionBarItems || []),
                    showClose ? {
                        item: <Button
                            shape='circle'
                            onClick={closeModal} iconName='close'
                            accent={accent} accentDark={accentDark} accentLight={accentLight}
                        />,
                        position: 'right',
                        title: 'Close',
                        key: 'close-modal'
                    } : null
                ]}
            />
            {<div className='modal-content'>
                {children}
            </div>}
            {btmActionBarItems && <ActionBar position='bottom'
                items={[
                    ...(btmActionBarItems instanceof Function && btmActionBarItems() || btmActionBarItems instanceof Array && btmActionBarItems || [])
                ]}
            />}
        </div>
    </div>

    if (visible) {
        if (modalArea) return ReactDOM.createPortal(content, modalArea);
        else return content;
    } else return <></>;
}

export default Modal;