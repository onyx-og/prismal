import React, { MutableRefObject, RefObject } from 'react';
import './index.scss';

import ActionBarAltItem from 'components/ActionBar/ActionBarAltItem';
import useElementWidth from 'hooks/useElementWidth';
import logger from 'utils/logger';

export interface ActionBarItemProps {
    item: JSX.Element;
    title?: string;
    siblingWeight?: number;
    scale?: boolean;
    scaleFactor?: number;
    alt?: JSX.Element;
    uniqueKey: string | number;
    sectionRef: RefObject<HTMLDivElement | null | undefined>;
    setReady?: ( arg: any ) => void;
}
export type ActionBarItemRef = {
    element: HTMLDivElement | null;
    key: string | number;
}
const ActionBarItem: React.FC<ActionBarItemProps> = ( props ) => {
    const {
        item, scale = true,
        scaleFactor = 1,
        uniqueKey,
        title,
        sectionRef,
        alt,
        siblingWeight = scaleFactor,
        setReady,
    } = props;
    const ref = React.useRef<HTMLDivElement | null>(null);

    // Use alternative component only if provided
    const _alt = alt ? <ActionBarAltItem item={item} title={title} alt={alt} /> : null;
 
    // Describes whethere the item should be scaled or not
    const [ scaling, setScaled ] = React.useState<{
        value: boolean | null;
        width: number
    }>({
        value: null,
        width: 0
    });

    // Keeps track of original width before scaling
    // Needed to understand when it shoulg go back to original form
    const [originalWidth, setOriginalWidth ] = React.useState(ref.current?.clientWidth || 0); 

    // As soon as we get a hold of the div's reference, gets its width and store it
    React.useEffect( () => { 
        if (ref.current?.clientWidth && !originalWidth ) {
            setOriginalWidth(ref.current.clientWidth);
        }
    }, [item]);

   

    const sectionWidth = useElementWidth(sectionRef);

    // If scaling is enabled and configured correctly, checks if it should switch to scaled form
    React.useLayoutEffect( () => {
        logger.debug({item: uniqueKey, sectionWidth, originalWidth, siblingWeight}, 'ActionBarItem - calculating for scaling');
        if ( scale && scaleFactor && sectionWidth && siblingWeight && originalWidth ) {
            if ( !scaling.value && originalWidth * scaleFactor > sectionWidth / siblingWeight ) {
                logger.debug({scaling},`ActionBarItem - item '${uniqueKey}' original width exceeds sectionRef's`);
                setScaled({value: true, width: 0});
            } else if ( (scaling.value || scaling.value == null) && originalWidth * scaleFactor <= sectionWidth / siblingWeight ) {
                setScaled({value: false, width: 0})
                logger.debug({ originalWidth, sectionWidth: sectionWidth, item: uniqueKey}, 'ActionBarItem - disabling scaling');
            } 
        } else if ( !scale ) {
            setScaled({value: false, width: 0})
        }
    }, [originalWidth, scale, scaleFactor, sectionWidth, uniqueKey]);

    // const currentWidth = useElementWidth(ref.current, 'offsetWidth');

    const renderedItem = React.useMemo( () => {
        return !scaling.value ? item : (_alt || item);
    }, [scaling, item, _alt]);

    React.useEffect( () => {
        const width = ref.current?.clientWidth || 0;
        if ( (scaling.value === true || scaling.value === false) && scaling.width !== width ) {
            logger.debug({width, element: ref.current}, 'ActionBarItem - scaling changed, updating width');
            setScaled({ value: scaling.value, width });
        }
    }, [scaling, ref]);

    React.useEffect( () => {
        const customRef = {
            element: ref.current,
            key: uniqueKey
        }
        let timeoutId: number;
        if (renderedItem && scaling.width ) {
            timeoutId = window.setTimeout( () => setReady && setReady(customRef), 500);
        }

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId)
        }
    }, [renderedItem, scaling]);
    
    return <div ref={ref} className='actionbar-item'>{renderedItem}</div>
}

export default ActionBarItem;