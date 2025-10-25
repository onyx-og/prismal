import {
    FC, useState, useRef, useEffect, useCallback, useMemo, JSX
} from 'react';
import useElementWidth from 'hooks/useElementWidth';
import type { ActionBarAltSectionProps, AcctionBarSectionProps,ActionBarItemRef } from '../types';
import ActionBarItem from 'components/ActionBar/ActionBarItem';
import Button from 'components/Button';
import useSidebar from 'hooks/useSidebar';

import './index.scss';

/**
 * @component ActionBarAltSection
 * @description Renders an alternative view for an ActionBar section, typically as a button that opens a sidebar with the section's items.
 * @param {ActionBarAltSectionProps} props The component props.
 * @returns {React.ReactElement} The rendered alternative section component.
 */
const ActionBarAltSection: FC<ActionBarAltSectionProps> = ( props ) => {
    const {
        items, title,
        modalAreaId,
        button = {iconName: 'ellipsis-v', type: "default"}
    } = props;

    const ref = useRef<HTMLDivElement | null>(null);
    /**
     * @function refSetter
     * @description A callback ref to get a reference to the section's content div.
     * @param {HTMLDivElement | null} node The DOM node of the content div.
     */
    const refSetter = useCallback( (node: HTMLDivElement | null) => {
        if (ref.current) {
            // Making sure that the ref is set only once
            return;
        }
        if (node) {
            // Save a reference to the node
            ref.current = node
        }
    }, []);


    // Re-access and alter items list to change the section ref
    const _items = useMemo( () => items.map( element => {
        return <element.type
            key={element.key}
            {...element.props}
            siblingWeight={1}
            sectionRef={ref}
        />
    }), [items]);

    const { Sidebar, open: openSidebar } = useSidebar({areaId: modalAreaId});

    return <>
        <Button shape='circle' iconName={button.iconName} type={button.type} onClick={openSidebar}>{title}</Button>
        <Sidebar areaId={modalAreaId}>
            <div ref={refSetter} className='actionbar-section-content'>{_items}</div>
        </Sidebar>
    </>
}

/**
 * @component ActionBarSection
 * @description A container for items within the ActionBar, organized into left, center, or right positions. It handles responsive scaling of its items.
 * @param {AcctionBarSectionProps} props The component props.
 * @returns {React.ReactElement} The rendered ActionBar section.
 */
const ActionBarSection: FC<AcctionBarSectionProps> = ( props ) => {
    const {
        type,
        items,
        modalAreaId,
        modalClassName,
        altIcon
    } = props;

    // Reference to the html div containing this section
    const ref = useRef<HTMLDivElement | null>(null);

    // Reference that will get populated with the items of this section
    const itemsList = useRef<{
        [key: string]: HTMLElement | null
    }>({});

    // State obj that mirrors above reference content, just because refs changes
    // can't be tracked in array of deps of react hooks, while a state update does
    const [_itemsList, updateItemsList ] = useState(itemsList.current);

    // 
    const [ scaling, setScaling ] = useState({
        value: false,
        itemsWidth: 0 // needed to track items total width before scaling
    });

    /**
     * Allows to render also when there are no items for this type
     * but there are for the center,
     * to make sure that those are centered
     */
    const [ 
        hasCenteredItems, 
        markCenterItemPresence
    ] = useState(false);

    const sectionWidth = useElementWidth(ref);

    const actionBarSectionClass = `actionbar-${type}`;

    /**
     * @function addItemRef
     * @description Callback to add a reference to an item's DOM element to the list.
     * @param {ActionBarItemRef | null} item The item reference object.
     * @returns {HTMLElement | null | undefined}
     */
    const addItemRef = useCallback( ( item: ActionBarItemRef | null) => {
        if ( item && item.element && type !== 'center' ) {
            // The unique key was enforced to assure that the list object contains
            // unique elements
            itemsList.current[item.key] = item.element;
            updateItemsList({...itemsList.current})
            return itemsList.current[item.key];
        }
    }, [type]);

    /**
     * @function refSetter
     * @description A callback ref to get a reference to the section's root div.
     * @param {HTMLDivElement | null} node The DOM node of the section div.
     */
    const refSetter = useCallback( (node: HTMLDivElement | null) => {
        if (ref.current) {
            return;
        }
        if (node) {
            // Save a reference to the node
            ref.current = node
        }
    }, []);

    /** Items expected for this actionbar section
     * mapped to the ActionBarItem component.
     * Also populates the items ref list to track their sizes
     * and checks if there are items that belong to the 'center' section
     */
    const _items = useMemo(() => {
        // let trueIndex = -1;

        const sectionItems = items.map( i => {
            if (i?.position === type) {
                // trueIndex++;
                return <ActionBarItem
                    item={i.item}
                    title={i.title}
                    uniqueKey={i.key}
                    key={i.key}
                    sectionRef={ref}
                    setReady={addItemRef}
                    scale={i.scale}
                    alt={i.alt}
                />
            } else if (!hasCenteredItems && i?.position === 'center') {
                markCenterItemPresence(true);
            }
            return undefined;
            // Even though there's the following filter, ts still thinks there may be undef values
        }).filter( e => e !== undefined ) as JSX.Element[];

        // The section items length is used to set the siblingWeight, used for the item scaling function
        // TODO: It would be better to supply a specific weight based on the element size
        return sectionItems
            .map( element => {
                return <element.type
                    key={element.key}
                    {...element.props}
                    siblingWeight={sectionItems.length}
                />
            })
            
    }, [items, type, hasCenteredItems, addItemRef]);

    useEffect( () => {
        itemsList.current = { ...itemsList.current };
    }, [_items]);

    /**
     * @function alterScaling
     * @description Toggles the scaling state of the section based on the total width of its items versus the available section width.
     * @param {{ [key: string]: HTMLElement | null }} _itemList An object of item elements.
     */
    const alterScaling = useCallback( (_itemList: {
        [key: string]: HTMLElement | null
    }) => {
        const totalItemsWidth = Object.values( _itemList).reduce( (total, element) => {
            return total + (element?.offsetWidth || 0);
        }, 0);
        if ( !scaling.value && totalItemsWidth && sectionWidth && totalItemsWidth >= sectionWidth) {
            setScaling({
                value: true,
                itemsWidth: totalItemsWidth
            });
        } else if ( scaling.value && scaling.itemsWidth && sectionWidth && scaling.itemsWidth < sectionWidth ) {
            setScaling({
                value: false,
                itemsWidth: 0
            });
        }
    }, [sectionWidth, scaling]);

    useEffect( () => {
        alterScaling(itemsList.current);
    }, [_itemsList, sectionWidth, alterScaling]);

    // Shows an alternative version of the section when scaling value is set to true
    const renderedItem = useMemo( () => {
        return !scaling.value ? _items : <ActionBarAltSection button={altIcon} modalClassName={modalClassName} modalAreaId={modalAreaId} items={_items}/>;
    }, [scaling, _items, modalAreaId, modalClassName, altIcon]);

    // Renders the component only if it has items of it's type,
    // or there are items in the center section
    return (_items.length || hasCenteredItems) ? <div className={actionBarSectionClass} ref={refSetter}>
        {renderedItem}
    </div> : <div className={actionBarSectionClass}>
    </div>;
}

export default ActionBarSection;