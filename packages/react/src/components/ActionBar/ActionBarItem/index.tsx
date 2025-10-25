import { 
    FC, useRef, useEffect, useState, useMemo, useLayoutEffect
} from 'react';
import './index.scss';

import ActionBarAltItem from 'components/ActionBar/ActionBarAltItem';
import useElementWidth from 'hooks/useElementWidth';

import type { ActionBarItemProps } from '../types';

/**
 * @component ActionBarItem
 * @description An individual item within an ActionBar section that can optionally scale or display an alternative element.
 * @param {ActionBarItemProps} props The component props.
 * @returns {React.ReactElement} The rendered action bar item.
 */
const ActionBarItem: FC<ActionBarItemProps> = ( props ) => {
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
    const ref = useRef<HTMLDivElement | null>(null);

    // Use alternative component only if provided
    const _alt = alt ? <ActionBarAltItem item={item} title={title} alt={alt} /> : null;
 
    // Describes whethere the item should be scaled or not
    const [ scaling, setScaled ] = useState<{
        value: boolean | null;
        width: number
    }>({
        value: null,
        width: 0
    });

    // Keeps track of original width before scaling
    // Needed to understand when it shoulg go back to original form
    const [originalWidth, setOriginalWidth ] = useState(ref.current?.clientWidth || 0); 

    // As soon as we get a hold of the div's reference, gets its width and store it
    useEffect( () => { 
        if (ref.current?.clientWidth && !originalWidth ) {
            setOriginalWidth(ref.current.clientWidth);
        }
    }, [item, originalWidth]);

   

    const sectionWidth = useElementWidth(sectionRef);

    // If scaling is enabled and configured correctly, checks if it should switch to scaled form
    useLayoutEffect( () => {
        if ( scale && scaleFactor && sectionWidth && siblingWeight && originalWidth ) {
            if ( !scaling.value && originalWidth * scaleFactor > sectionWidth / siblingWeight ) {
                setScaled({value: true, width: 0});
            } else if ( (scaling.value || scaling.value == null) && originalWidth * scaleFactor <= sectionWidth / siblingWeight ) {
                setScaled({value: false, width: 0})
            } 
        } else if ( !scale ) {
            setScaled({value: false, width: 0})
        }
    }, [originalWidth, scale, scaleFactor, sectionWidth, uniqueKey, siblingWeight, scaling.value]);

    // const currentWidth = useElementWidth(ref.current, 'offsetWidth');

    const renderedItem = useMemo( () => {
        return !scaling.value ? item : (_alt || item);
    }, [scaling, item, _alt]);

    useEffect( () => {
        const width = ref.current?.clientWidth || 0;
        if ( (scaling.value === true || scaling.value === false) && scaling.width !== width ) {
            setScaled({ value: scaling.value, width });
        }
    }, [scaling, ref]);

    useEffect( () => {
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
    }, [renderedItem, scaling, uniqueKey, setReady]);
    
    return <div ref={ref} className='actionbar-item'>{renderedItem}</div>
}

export default ActionBarItem;