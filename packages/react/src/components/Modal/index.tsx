import './index.scss';
import {ReactNode, FC, useMemo} from 'react';
import ActionBar, { ActionBarItemConfig } from 'components/ActionBar';
import Button from 'components/Button';
import {createPortal} from 'react-dom';
import ComponentProps from '../Component';
import Card from 'components/Card';

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
};

const Modal: FC<ModalProps> = (props) => {
    const {
        "data-id": dataId,
        areaId,
        title,
        children,
        visible = false,
        closeModal,
        showClose = true,
        className, style,
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

    const headerActionBarItems = useMemo(() => {
        let items: ActionBarItemConfig[] = [];
        if (title) items.push({ item: <span>{title}</span>, position: 'center', key: 'modal-title', scale: false });
        if (showClose) items.push({
            item: <Button
                shape='circle'
                type="text"
                onClick={closeModal} iconName='close'
                accent={accent} accentDark={accentDark} accentLight={accentLight}
            />,
            position: 'right',
            title: 'Close',
            key: 'close-modal'
        });
        return items;
    },[title, showClose, accent, accentLight, accentDark]);

    const {
        header = <ActionBar
            items={headerActionBarItems}
        />,
        footer
    } = props;

    const component = <div data-id={dataId} className={modalClass}>
        <div className={modalBgClass} onClick={closeModal}></div>
        <Card className={modalFgClass}
            header={header} footer={footer}>
            {<div className='modal-content'>
                {children}
            </div>}
        </Card>
    </div>

    if (visible) {
        if (modalArea) return createPortal(component, modalArea);
        else return component;
    } else return <></>;
}

export default Modal;