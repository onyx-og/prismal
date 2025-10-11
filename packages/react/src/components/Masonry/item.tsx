import { useState, useImperativeHandle, ReactNode, forwardRef, ForwardedRef, useRef,RefObject } from 'react';


export interface MasonryItemRef {
    applyStyle: (style: {[key: string]: any}) => void;
    element: RefObject<HTMLDivElement | null>;
}
// 'forwardRef' è necessario per permettere al componente genitore (MasonryGrid) 
// di ottenere un riferimento al DOM di questo elemento.
const MasonryItem = forwardRef((props: { children: ReactNode }, ref: ForwardedRef<MasonryItemRef>) => {
    const {children} = props;
    // 1. Stato per memorizzare lo stile calcolato
    const [itemStyle, setItemStyle] = useState({});
    const elementRef = useRef(null);
    // 2. Esporre la funzione 'applyStyle' attraverso il riferimento (ref)
    // Questa funzione sarà chiamata dall'Hook useMasonryGrid
    useImperativeHandle(ref, () => ({
        element: elementRef,
        // Il componente esterno può chiamare itemRef.current.applyStyle({...})
        applyStyle: (newStyle) => {
            setItemStyle(newStyle);
        }
    }));

    // Applicare lo stile memorizzato nel div esterno
    return <div 
        className="prismal-masonry-item" 
        ref={elementRef} // Il ref punta all'elemento DOM che vogliamo misurare
        style={itemStyle} // Lo stile viene applicato tramite lo stato di React
    >
        {children}
        {/* Contenuto dell'elemento, es. {itemData.imageUrl && <img src={itemData.imageUrl} alt="" />} */}
    </div>
});

export default MasonryItem;