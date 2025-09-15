import {JSX, useMemo, useState, useEffect, useRef, FC, ReactNode, useCallback, Children} from 'react';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';

interface SliderProcProps extends ComponentProps {
    type: "process";
    id?: number;
    slides: any[];
    spacing?: number;
    slideWrapper: (arg0: any) => JSX.Element;
    size?: 'xl' | 'l' | 'm' | 's';
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
}

interface SliderRawProps extends ComponentProps {
    type: "raw";
    id?: number;
    spacing?: number;
    size?: 'xl' | 'l' | 'm' | 's';
    children: ReactNode[];
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
}

export type SliderProps = SliderProcProps | SliderRawProps;

const Slider: FC<SliderProps> = ( props ) => {
    const { 
        "data-id": dataId,
        id = Math.random().toString(36).substring(2, 12),
        spacing = 5, 
        size = "l",
        autoPlay = false,
        showNavBar = true
    } = props;

    const { className } = props;
    let sliderClass = "prismal-slider-outer-container";
    if (className) sliderClass = `${sliderClass} ${className}`;

    const { accent, accentLight, accentDark } = props;    
    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});

    // [TODO] Add autostart and timed slide

    const {
        navElBackward = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M213.7 256L380.9 81.9c4.2-4.3 4.1-11.4-.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-.2L131.1 247.9c-2.2 2.2-3.2 5.2-3 8.1-.1 3 .9 5.9 3 8.1l204.2 212.7c4.2 4.3 11.2 4.2 15.5-.2l29.9-30.6c4.3-4.4 4.4-11.5.2-15.8L213.7 256z"></path>
        </svg> ,
        navElForward = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M298.3 256L131.1 81.9c-4.2-4.3-4.1-11.4.2-15.8l29.9-30.6c4.3-4.4 11.3-4.5 15.5-.2L380.9 248c2.2 2.2 3.2 5.2 3 8.1.1 3-.9 5.9-3 8.1L176.7 476.8c-4.2 4.3-11.2 4.2-15.5-.2L131.3 446c-4.3-4.4-4.4-11.5-.2-15.8L298.3 256z"></path>
        </svg>
    } = props;
    
    const renderNavArrow = useCallback( ( i: number, type: 'next' | 'previous') => {
        let arrowEl = type === 'next' ? navElForward : navElBackward
        return <label key={i} htmlFor={`slider_${i}-${id}`} className={`numb${i}`}> 
            { arrowEl }
        </label>
    }, [id, navElForward]);

    const {
        labelClass, labelEl
    } = props;

    const renderLabel = useCallback( ( i: number ) => {
        let labelClass_ = "prismal-slider-label",
            labelContent = <></>
        if (labelClass) labelClass_ = `${labelClass_} ${labelClass}`
        if (labelEl) labelContent = labelEl;
        return <label key={i} htmlFor={`slider_${i}-${id}`} className={`${labelClass_} page${i}`}>
            {labelContent}
        </label>
    }, [id, labelClass, labelEl]);

    let slideshowClass = 'prismal-slider-inner-container';
    switch (size) {
        case 'xl':
            slideshowClass = `${slideshowClass} prismal-slider-slides-xl`;
        break;
        case 'l':
            slideshowClass = `${slideshowClass} prismal-slider-slides-l`;
        break;
        case 'm':
            slideshowClass = `${slideshowClass} prismal-slider-slides-m`;
        break;
        case 's':
            slideshowClass = `${slideshowClass} prismal-slider-slides-s`;
        break;
        default:
            slideshowClass = `${slideshowClass} prismal-slider-slides-xl`;
    }

    const inputCtrlList = useRef<(HTMLInputElement)[]>([]);

    const storeInput = (node: HTMLInputElement | null, index: number) => {
        if (node) {
            inputCtrlList.current[index] = node;
        }
    }

    const renderInputCtrl = useCallback( ( i: number ) => {
        if ( i === 0 ) return <input ref={(n)=> storeInput(n, i)} key={i} type="radio" name={`slider-${id}`} className={`prismal-slider-radio${i}`}
        defaultChecked hidden id={`slider_${i}-${id}`}>
            </input>
        else return <input ref={(n)=> storeInput(n, i)} key={i} type="radio" name={`slider-${id}`} className={`prismal-slider-radio${i}`}
            hidden id={`slider_${i}-${id}`}>
            </input>
    }, [id]);

    if (props.type == "process") {
        const { slides, slideWrapper } = props;

        const renderElements = useCallback( () => {

            let labels: JSX.Element[] = [], 
                navArrowsPrevious: JSX.Element[] = [],
                navArrowsNext: JSX.Element[] = [],
                inputCtrls: JSX.Element[] = [];
                
            let slideList = slides.map( (slide, i) => {
                labels.push( renderLabel(i) );
                navArrowsPrevious.push( renderNavArrow(i, 'previous') );
                navArrowsNext.push( renderNavArrow(i, 'next') );
                inputCtrls.push( renderInputCtrl(i) );

                return <div key={i} className="prismal-slider-slide-container" id={`slide-${i}`}>
                    {slideWrapper(slide)}
                </div>;
            });

            return {
                labels, inputCtrls,
                navArrowsNext, navArrowsPrevious,
                slideList
            }
        }, [slideWrapper, renderInputCtrl, renderLabel, renderNavArrow, slides, slideWrapper]);

        const { labels, inputCtrls, navArrowsNext, navArrowsPrevious, slideList } = renderElements();

        const [slideNumber, setSlide] = useState<number>(0);

        useEffect(() => {
            if (inputCtrlList.current[slideNumber]) {
                inputCtrlList.current[slideNumber].checked = true;
            } else {
                console.log("Error, slide non existing", {list: inputCtrlList.current, slideNumber})
            }
        },[slideNumber])

        useEffect( () => {
            let interval: NodeJS.Timeout;
            // When the reference of the last input is added, start autoplay
            if (inputCtrlList.current.length == inputCtrls.length && autoPlay) {
                interval = setInterval(() => {
                    if (slideNumber < (inputCtrlList.current.length-1)) {
                        setSlide(slideNumber+1)
                    } else {
                        setSlide(0)
                    }
                }, autoPlay);
            }
            return () => {
                if (interval) {
                    clearInterval(interval)
                }
            }
        }, [inputCtrlList.current.length, slideNumber, autoPlay]);

        const slideshowStyle = `
            #prismal-slider-${id} .prismal-slider-slides{
                grid-auto-flow: column;
                grid-column-gap: ${spacing}px;
                grid-template-rows: calc(100% - 2.5px);
            }
            
            #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                /* 3/4 = 0.75 */
                grid-auto-columns: calc(25% - ${ spacing * 0.75 }px);
            }
            #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                /* 2/3 = 0.667 */
                grid-auto-columns: calc(33.3% - ${ spacing * 0.667 }px);
            }
            #prismal-slider-${id}.prismal-slider-slides-l .prismal-slider-slides {
                /* 1/2 = 0.5 => times: 0.5 = divided_by: 2 */
                grid-auto-columns: calc(50% - ${ spacing * 0.5 }px);
            }
            #prismal-slider-${id}.prismal-slider-slides-xl .prismal-slider-slides {
                grid-auto-columns: 100%;
            }
            @media screen and (max-width: 840px) {
                #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                    /* 2/3 = 0.667 */
                    grid-auto-columns: calc(33.3% - ${ spacing * 0.667 }px);
                }
                #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                    grid-auto-columns: calc(50% - ${ spacing * 2 }px);
                }
            }
            @media screen and (max-width: 600px) {
                #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                    grid-auto-columns: calc(50% - ${ spacing * 2 }px);
                }
                #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                    grid-auto-columns: 100%;
                }
                #prismal-slider-${id}.prismal-slider-slides-l .prismal-slider-slides {
                    grid-auto-columns: 100%;
                }
                #prismal-slider-${id} {
                    padding: 0 !important;
                }
            }
            @media screen and (max-width: 408px) {
                #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                    grid-auto-columns: 100%;
                }
            }
            /* Slideshow pager arrow events */
            ${ [...Array(slides.length).keys()].map( i => {
                let next = ( i + 1 === slides.length ) ? 0 : i + 1;
                let previous = ( i - 1 < 0 ) ? slides.length - 1 : i - 1;
                return `
                    #prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .ctrl-next .numb${next}, 
                    #prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .ctrl-previous .numb${previous} {
                        display: block;
                        z-index: 1
                    }
                `
            }).join('') }
            /* Slider Pager event */
            ${ [...Array(slides.length).keys()].map( i => {
                if ( i !== (slides.length-1) ) return `#prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .prismal-slider-pagination-outer .page${i},`
                else return `#prismal-slider-${id} .prismal-slider-radio${(slides.length-1)}:checked ~ .prismal-slider-pagination-outer .page${(slides.length-1)} {
                    background: rgba(255,255,255,1);
                }`
            }).join('') }
            /* Slide effect */
            ${ [...Array(slides.length).keys()].map( i => {
                let transformRule: string;
                if ( i === 0 ) {
                    transformRule = `transform: translateX(0%);`
                } else if ( i === 1 ) {
                    transformRule = `transform: translateX(calc(${ i * -100 }% - ${spacing}px));`
                } else {
                    transformRule = `transform: translateX(calc(${ i * -100 }% - ${i * spacing}px));`
                }
                return `#prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .prismal-slider-slides .prismal-slider-slide-container { 
                    ${transformRule}
                }`
            }).join('') }
            /* Styles caption background */
            #prismal-slider-${id} [class^='imghvr-'] figcaption:before,
            #prismal-slider-${id} [class*=' imghvr-'] figcaption:before {
                content:"";
                width:100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        `

        return <div data-id={dataId} className={sliderClass} style={style_}>
            <style>{slideshowStyle}</style>
            
            <div id={`prismal-slider-${id}`} className={slideshowClass}>
                { inputCtrls }
                { showNavBar ? <div className="prismal-slider-pagination-outer">
                    <div className="prismal-slider-pagination-inner">
                        { labels }
                    </div>
                </div> : null}
                <div className="ctrl-next prismal-slider-ctrl">
                    { navArrowsNext }
                </div>
                <div className="ctrl-previous prismal-slider-ctrl">
                    { navArrowsPrevious }
                </div>
                <div className="prismal-slider-slides"> 
                    { slideList }
                </div>
            </div>
        </div>
    } else {
        const { children } = props;
        const children_ = Children.toArray(children).filter(el => !!el);

        const renderElements = useCallback( () => {

            let labels: JSX.Element[] = [], 
                navArrowsPrevious: JSX.Element[] = [],
                navArrowsNext: JSX.Element[] = [],
                inputCtrls: JSX.Element[] = [];
                
            let slideList = children_.map( (slide, i) => {
                labels.push( renderLabel(i) );
                navArrowsPrevious.push( renderNavArrow(i, 'previous') );
                navArrowsNext.push( renderNavArrow(i, 'next') );
                inputCtrls.push( renderInputCtrl(i) );
                return <div key={i} className="prismal-slider-slide-container" id={`slide-${i}`}>
                    {slide}
                </div>;
            });

            slideList.filter( el => !!el );

            return {
                labels, inputCtrls,
                navArrowsNext, navArrowsPrevious,
                slideList
            }
        }, [children_, renderInputCtrl, renderLabel, renderNavArrow, children_]);

        const { labels, inputCtrls, navArrowsNext, navArrowsPrevious, slideList } = renderElements();

        const [slideNumber, setSlide] = useState<number>(0);

        useEffect(() => {
            if (inputCtrlList.current[slideNumber]) {
                inputCtrlList.current[slideNumber].checked = true;
            } else {
                console.log("Error, slide non existing", {list: inputCtrlList.current, slideNumber})
            }
        },[slideNumber])

        useEffect( () => {
            let interval: NodeJS.Timeout;
            // When the reference of the last input is added, start autoplay
            if (inputCtrlList.current.length == inputCtrls.length && autoPlay) {
                interval = setInterval(() => {
                    if (slideNumber < (inputCtrlList.current.length-1)) {
                        setSlide(slideNumber+1)
                    } else {
                        setSlide(0)
                    }
                }, autoPlay);
            }
            return () => {
                if (interval) {
                    clearInterval(interval)
                }
            }
        }, [inputCtrlList.current.length, slideNumber, autoPlay]);

        const slideshowStyle = `
            #prismal-slider-${id} .prismal-slider-slides{
                grid-auto-flow: column;
                grid-column-gap: ${spacing}px;
                grid-template-rows: calc(100% - 2.5px);
            }
            
            #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                /* 3/4 = 0.75 */
                grid-auto-columns: calc(25% - ${ spacing * 0.75 }px);
            }
            #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                /* 2/3 = 0.667 */
                grid-auto-columns: calc(33.3% - ${ spacing * 0.667 }px);
            }
            #prismal-slider-${id}.prismal-slider-slides-l .prismal-slider-slides {
                /* 1/2 = 0.5 => times: 0.5 = divided_by: 2 */
                grid-auto-columns: calc(50% - ${ spacing * 0.5 }px);
            }
            #prismal-slider-${id}.prismal-slider-slides-xl .prismal-slider-slides {
                grid-auto-columns: 100%;
            }
            @media screen and (max-width: 840px) {
                #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                    /* 2/3 = 0.667 */
                    grid-auto-columns: calc(33.3% - ${ spacing * 0.667 }px);
                }
                #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                    grid-auto-columns: calc(50% - ${ spacing * 2 }px);
                }
            }
            @media screen and (max-width: 600px) {
                #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                    grid-auto-columns: calc(50% - ${ spacing * 2 }px);
                }
                #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                    grid-auto-columns: 100%;
                }
                #prismal-slider-${id}.prismal-slider-slides-l .prismal-slider-slides {
                    grid-auto-columns: 100%;
                }
                #prismal-slider-${id} {
                    padding: 0 !important;
                }
            }
            @media screen and (max-width: 408px) {
                #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                    grid-auto-columns: 100%;
                }
            }
            /* Slideshow pager arrow events */
            ${ [...Array(children_.length).keys()].map( i => {
                let next = ( i + 1 === children_.length ) ? 0 : i + 1;
                let previous = ( i - 1 < 0 ) ? children_.length - 1 : i - 1;
                return `
                    #prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .ctrl-next .numb${next}, 
                    #prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .ctrl-previous .numb${previous} {
                        display: block;
                        z-index: 1
                    }
                `
            }).join('') }
            /* Slider Pager event */
            ${ [...Array(children_.length).keys()].map( i => {
                if ( i !== (children_.length-1) ) return `#prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .prismal-slider-pagination-outer .page${i},`
                else return `#prismal-slider-${id} .prismal-slider-radio${(children_.length-1)}:checked ~ .prismal-slider-pagination-outer .page${(children_.length-1)} {
                    background: rgba(255,255,255,1);
                }`
            }).join('') }
            /* Slide effect */
            ${ [...Array(children_.length).keys()].map( i => {
                let transformRule: string;
                if ( i === 0 ) {
                    transformRule = `transform: translateX(0%);`
                } else if ( i === 1 ) {
                    transformRule = `transform: translateX(calc(${ i * -100 }% - ${spacing}px));`
                } else {
                    transformRule = `transform: translateX(calc(${ i * -100 }% - ${i * spacing}px));`
                }
                return `#prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .prismal-slider-slides .prismal-slider-slide-container { 
                    ${transformRule}
                }`
            }).join('') }
            /* Styles caption background */
            #prismal-slider-${id} [class^='imghvr-'] figcaption:before,
            #prismal-slider-${id} [class*=' imghvr-'] figcaption:before {
                content:"";
                width:100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        `

        return <div data-id={dataId} className={sliderClass} style={style_}>
            <style>{slideshowStyle}</style>
            
            <div id={`prismal-slider-${id}`} className={slideshowClass}>
                { inputCtrls }
                {showNavBar ? <div className="prismal-slider-pagination-outer">
                    <div className="prismal-slider-pagination-inner">
                        { labels }
                    </div>
                </div> : null}
                <div className="ctrl-next prismal-slider-ctrl">
                    { navArrowsNext }
                </div>
                <div className="ctrl-previous prismal-slider-ctrl">
                    { navArrowsPrevious }
                </div>
                <div className="prismal-slider-slides"> 
                    { slideList }
                </div>
            </div>
        </div>
    }
}

export default Slider;