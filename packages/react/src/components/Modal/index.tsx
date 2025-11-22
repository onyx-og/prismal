import './index.scss';
import { ReactNode, FC, useMemo } from 'react';
import ActionBar, { ActionBarItemConfig } from 'components/ActionBar';
import Button from 'components/Button';
import { createPortal } from 'react-dom';
import ComponentProps from '../Component';
import Card from 'components/Card';

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
};

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
const Modal: FC<ModalProps> = (props) => {
    const {
        "data-id": dataId,
        areaId,
        title,
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
    }, [title, showClose, closeModal, accent, accentLight, accentDark]);

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