import './index.scss';

import ActionBar from 'components/ActionBar';
import Button from 'components/Button';
import ReactDOM from 'react-dom';
import ComponentProps from '../Component';
import Card from 'components/Card';

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
};

const Modal: React.FC<ModalProps> = (props) => {
    const {
        areaId,
        title = "modal",
        children,
        visible = false,
        closeModal,
        showClose = true,
        className,
        accent, accentDark, accentLight,
        bgClassName, fgClassName
    } = props;

    let modalClass = 'prismal-modal';

    if (visible) modalClass = `${modalClass} visible`;
    if (className) modalClass = `${modalClass} ${className}`;

    let modalFgClass = 'modal-fg'; // The modal
    let modalBgClass = 'modal-bg'; // Mask

    if (bgClassName) modalBgClass = `${modalBgClass} ${bgClassName}`;
    if (fgClassName) modalFgClass = `${modalFgClass} ${fgClassName}`;

    const modalArea = areaId ? document.getElementById(areaId) : undefined;

    const {
        header = <ActionBar
            items={[
                { item: <span>{title}</span>, position: 'center', key: 'modal-title', scale: false } ,
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
        />,
        footer
    } = props;

    const component = <div className={modalClass}>
        <div className={modalBgClass} onClick={closeModal}></div>
        <Card className={modalFgClass}
            header={header} footer={footer}>
            {<div className='modal-content'>
                {children}
            </div>}
        </Card>
    </div>

    if (visible) {
        if (modalArea) return ReactDOM.createPortal(component, modalArea);
        else return component;
    } else return <></>;
}

export default Modal;