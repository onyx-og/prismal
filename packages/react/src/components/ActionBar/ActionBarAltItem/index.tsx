import {
    FC
} from 'react';
import useModal from 'hooks/useModal';
import Button from 'components/Button';

import type { ActionBarAltItem as ActionBarAltItemProps } from "../types";

/**
 * @component ActionBarAltItem
 * @description By default, the alternative item for an action bar item is a button with an ellipsis icon. When clicked, it shows a modal with the original item as content. If an alternative element (`alt`) is provided, it is used as the trigger instead.
 * @param {ActionBarAltItemProps} props The component props.
 * @returns {React.ReactElement} The rendered alternative action bar item.
 */
const ActionBarAltItem: FC<ActionBarAltItemProps> = ( props ) => {
    const { item, title, alt, modalAreaId } = props;

    const { Modal, open: openModal } = useModal({areaId: modalAreaId});

    const trigger = alt ? <alt.type 
        {...alt.props}
        // TODO: Consider the use case in which the alternative element already has an onClick,
        // should it be fired too?
        onClick={openModal} 
    /> : <Button shape='circle' iconName='ellipsis-h' onClick={openModal}>{title}</Button>

    return <>
        { trigger }
        { <Modal title={title}>{item}</Modal> }
    </>
}


export default ActionBarAltItem;