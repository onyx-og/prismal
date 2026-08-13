import {JSX, useMemo, useState, useEffect, useRef, FC, ReactNode, useCallback, Children, TouchEvent as ReactTouchEvent, KeyboardEvent as ReactKeyboardEvent} from 'react';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';

const SWIPE_THRESHOLD = 50;

const getSwipeDirection = (startX: number, startY: number, endX: number, endY: number): 'left' | 'right' | null => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return null;
    return deltaX < 0 ? 'left' : 'right';
}

type Orientation = 'horizontal' | 'vertical';

/**
 * @typedef {string} SliderAnimation
 * @description The transition physics applied when moving between slides.
 * - `ease`: a smooth, standard slide with no overshoot (default).
 * - `bounce`: the slide overshoots slightly before settling, for a springier feel.
 * - `linear`: a constant-speed slide, with no easing.
 * - `none`: the slide change is instant, with no transition.
 */
export type SliderAnimation = 'ease' | 'bounce' | 'linear' | 'none';

/**
 * @function buildSlideshowStyle
 * @description Builds the per-instance stylesheet driving slide layout, pagination, nav-arrow visibility
 * and the slide transform, mirrored across the horizontal (translateX/columns) and vertical
 * (translateY/rows) orientations.
 */
const buildSlideshowStyle = ({
    id, spacing, orientation, count
}: {
    id: string | number;
    spacing: number;
    orientation: Orientation;
    count: number;
}): string => {
    const isVertical = orientation === 'vertical';
    const flowProp = isVertical ? 'row' : 'column';
    const gapProp = isVertical ? 'grid-row-gap' : 'grid-column-gap';
    const crossAxisProp = isVertical ? 'grid-template-columns' : 'grid-template-rows';
    const sizeAxisProp = isVertical ? 'grid-auto-rows' : 'grid-auto-columns';
    const translateAxis = isVertical ? 'translateY' : 'translateX';

    return `
        #prismal-slider-${id} .prismal-slider-slides{
            grid-auto-flow: ${flowProp};
            ${gapProp}: ${spacing}px;
            ${crossAxisProp}: calc(100% - 2.5px);
        }

        #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
            /* 3/4 = 0.75 */
            ${sizeAxisProp}: calc(25% - ${spacing * 0.75}px);
        }
        #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
            /* 2/3 = 0.667 */
            ${sizeAxisProp}: calc(33.3% - ${spacing * 0.667}px);
        }
        #prismal-slider-${id}.prismal-slider-slides-l .prismal-slider-slides {
            /* 1/2 = 0.5 => times: 0.5 = divided_by: 2 */
            ${sizeAxisProp}: calc(50% - ${spacing * 0.5}px);
        }
        #prismal-slider-${id}.prismal-slider-slides-xl .prismal-slider-slides {
            ${sizeAxisProp}: 100%;
        }
        @media screen and (max-width: 840px) {
            #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                /* 2/3 = 0.667 */
                ${sizeAxisProp}: calc(33.3% - ${spacing * 0.667}px);
            }
            #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                ${sizeAxisProp}: calc(50% - ${spacing * 2}px);
            }
        }
        @media screen and (max-width: 600px) {
            #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                ${sizeAxisProp}: calc(50% - ${spacing * 2}px);
            }
            #prismal-slider-${id}.prismal-slider-slides-m .prismal-slider-slides {
                ${sizeAxisProp}: 100%;
            }
            #prismal-slider-${id}.prismal-slider-slides-l .prismal-slider-slides {
                ${sizeAxisProp}: 100%;
            }
            #prismal-slider-${id} {
                padding: 0 !important;
            }
        }
        @media screen and (max-width: 408px) {
            #prismal-slider-${id}.prismal-slider-slides-s .prismal-slider-slides {
                ${sizeAxisProp}: 100%;
            }
        }
        /* Slideshow pager arrow events */
        ${[...Array(count).keys()].map(i => {
            let next = (i + 1 === count) ? 0 : i + 1;
            let previous = (i - 1 < 0) ? count - 1 : i - 1;
            return `
                #prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .ctrl-next .numb${next},
                #prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .ctrl-previous .numb${previous} {
                    display: block;
                    z-index: 1
                }
            `
        }).join('')}
        /* Slider Pager event */
        ${[...Array(count).keys()].map(i => {
            if (i !== (count - 1)) return `#prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .prismal-slider-pagination-outer .page${i},`
            else return `#prismal-slider-${id} .prismal-slider-radio${(count - 1)}:checked ~ .prismal-slider-pagination-outer .page${(count - 1)} {
                background: rgba(255,255,255,1);
            }`
        }).join('')}
        /* Slide effect */
        ${[...Array(count).keys()].map(i => {
            let transformRule: string;
            if (i === 0) {
                transformRule = `transform: ${translateAxis}(0%);`
            } else if (i === 1) {
                transformRule = `transform: ${translateAxis}(calc(${i * -100}% - ${spacing}px));`
            } else {
                transformRule = `transform: ${translateAxis}(calc(${i * -100}% - ${i * spacing}px));`
            }
            return `#prismal-slider-${id} .prismal-slider-radio${i}:checked ~ .prismal-slider-slides .prismal-slider-slide-container {
                ${transformRule}
            }`
        }).join('')}
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
    `;
};

interface SliderProcProps extends ComponentProps {
    type: "process";
    id?: number;
    slides: any[];
    spacing?: number;
    slideWrapper: (arg0: any) => JSX.Element;
    size?: 'xl' | 'l' | 'm' | 's';
    orientation?: Orientation;
    /** The transition physics applied when moving between slides. Defaults to `ease`. */
    animation?: SliderAnimation;
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
    /** The controlled active slide index. Falls back to internal state when omitted. */
    selected?: number;
    /** Called whenever the active slide changes, from any source (swipe, keyboard, pagination, autoplay). */
    onChange?: (index: number) => void;
    /**
     * Called with (fromIndex, toIndex) before any internal navigation (pagination
     * click, swipe, arrow key, or autoplay tick) commits. Return false to block the
     * transition entirely — the slider stays on `fromIndex` and no onChange fires.
     * Omit for the previous unguarded behavior. Not consulted for programmatic
     * changes via the `selected` prop — a controlling parent is assumed to have
     * already applied its own gating before choosing to change `selected`.
     */
    canAdvance?: (fromIndex: number, toIndex: number) => boolean;
}

interface SliderRawProps extends ComponentProps {
    type: "raw";
    id?: number;
    spacing?: number;
    size?: 'xl' | 'l' | 'm' | 's';
    orientation?: Orientation;
    /** The transition physics applied when moving between slides. Defaults to `ease`. */
    animation?: SliderAnimation;
    children: ReactNode[];
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
    /** The controlled active slide index. Falls back to internal state when omitted. */
    selected?: number;
    /** Called whenever the active slide changes, from any source (swipe, keyboard, pagination, autoplay). */
    onChange?: (index: number) => void;
    /**
     * Called with (fromIndex, toIndex) before any internal navigation (pagination
     * click, swipe, arrow key, or autoplay tick) commits. Return false to block the
     * transition entirely — the slider stays on `fromIndex` and no onChange fires.
     * Omit for the previous unguarded behavior. Not consulted for programmatic
     * changes via the `selected` prop — a controlling parent is assumed to have
     * already applied its own gating before choosing to change `selected`.
     */
    canAdvance?: (fromIndex: number, toIndex: number) => boolean;
}

export type SliderProps = SliderProcProps | SliderRawProps;

const Slider: FC<SliderProps> = ( props ) => {
    const {
        "data-id": dataId,
        id = Math.random().toString(36).substring(2, 12),
        spacing = 5,
        size = "l",
        orientation = "horizontal",
        animation = "ease",
        autoPlay = false,
        showNavBar = true,
        selected,
        onChange,
        canAdvance
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
    }, [id, navElForward, navElBackward]);

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
    if (orientation === 'vertical') slideshowClass = `${slideshowClass} prismal-slider-vertical`;
    slideshowClass = `${slideshowClass} prismal-slider-anim-${animation}`;

    const inputCtrlList = useRef<(HTMLInputElement)[]>([]);

    const storeInput = (node: HTMLInputElement | null, index: number) => {
        if (node) {
            inputCtrlList.current[index] = node;
        }
    }

    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    /**
     * @function renderInputCtrl
     * @description Renders the hidden radio input driving a given slide's CSS-checked state, wired to
     * `onSelect` so a direct label/radio click (native navigation) stays in sync with internal state.
     */
    const renderInputCtrl = useCallback( ( i: number, onSelect: (i: number) => void ) => {
        if ( i === 0 ) return <input ref={(n)=> storeInput(n, i)} key={i} type="radio" name={`slider-${id}`} className={`prismal-slider-radio${i}`}
        defaultChecked hidden id={`slider_${i}-${id}`} onChange={() => onSelect(i)}>
            </input>
        else return <input ref={(n)=> storeInput(n, i)} key={i} type="radio" name={`slider-${id}`} className={`prismal-slider-radio${i}`}
            hidden id={`slider_${i}-${id}`} onChange={() => onSelect(i)}>
            </input>
    }, [id]);

    if (props.type == "process") {
        const { slides, slideWrapper } = props;

        const renderElements = useCallback( (onSelect: (i: number) => void) => {

            let labels: JSX.Element[] = [],
                navArrowsPrevious: JSX.Element[] = [],
                navArrowsNext: JSX.Element[] = [],
                inputCtrls: JSX.Element[] = [];

            let slideList = slides.map( (slide, i) => {
                labels.push( renderLabel(i) );
                navArrowsPrevious.push( renderNavArrow(i, 'previous') );
                navArrowsNext.push( renderNavArrow(i, 'next') );
                inputCtrls.push( renderInputCtrl(i, onSelect) );

                return <div key={i} className="prismal-slider-slide-container" id={`slide-${i}`}>
                    {slideWrapper(slide)}
                </div>;
            });

            return {
                labels, inputCtrls,
                navArrowsNext, navArrowsPrevious,
                slideList
            }
        }, [renderInputCtrl, renderLabel, renderNavArrow, slides, slideWrapper]);

        const [slideNumber, setSlide] = useState<number>(selected ?? 0);
        const [isFocused, setIsFocused] = useState(false);

        // Gate every internal-navigation path through `canAdvance` before it commits.
        // If blocked, the hidden radio for `slideNumber` is forced back to `checked`
        // — the native click already flipped its own `checked` attribute before this
        // ever runs, and the CSS `:checked ~ ...` transform rule (buildSlideshowStyle)
        // reacts to that DOM attribute directly, not to React state, so leaving it
        // flipped would show the blocked slide's transform even though `slideNumber`
        // in JS state never moved.
        const attemptSlide = useCallback((next: number) => {
            if (canAdvance && !canAdvance(slideNumber, next)) {
                if (inputCtrlList.current[slideNumber]) inputCtrlList.current[slideNumber].checked = true;
                return;
            }
            setSlide(next);
        }, [canAdvance, slideNumber]);

        const { labels, inputCtrls, navArrowsNext, navArrowsPrevious, slideList } = renderElements(attemptSlide);

        useEffect(() => {
            if (inputCtrlList.current[slideNumber]) {
                inputCtrlList.current[slideNumber].checked = true;
            } else {
                console.log("Error, slide non existing", {list: inputCtrlList.current, slideNumber})
            }
        },[slideNumber])

        // Syncs internal state when the controlled `selected` prop changes externally.
        useEffect(() => {
            if (selected !== undefined && selected !== slideNumber) {
                setSlide(selected);
            }
        }, [selected]);

        // Notifies consumers whenever the active slide changes, regardless of source.
        useEffect(() => {
            onChange?.(slideNumber);
        }, [slideNumber, onChange]);

        useEffect( () => {
            // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setInterval>` for browser compatibility.
            let interval: ReturnType<typeof setInterval>;
            // When the reference of the last input is added, start autoplay.
            // Paused while the slider has focus, and reset on every slide change (this effect
            // re-runs whenever slideNumber changes, tearing down and rescheduling the interval).
            if (inputCtrlList.current.length == inputCtrls.length && autoPlay && !isFocused) {
                interval = setInterval(() => {
                    if (slideNumber < (inputCtrlList.current.length-1)) {
                        attemptSlide(slideNumber+1)
                    } else {
                        attemptSlide(0)
                    }
                }, autoPlay);
            }
            return () => {
                if (interval) {
                    clearInterval(interval)
                }
            }
        }, [inputCtrlList.current.length, slideNumber, autoPlay, inputCtrls.length, isFocused, attemptSlide]);

        const handleTouchEnd = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
            if (!touchStartRef.current) return;
            const touch = e.changedTouches[0];
            const direction = getSwipeDirection(touchStartRef.current.x, touchStartRef.current.y, touch.clientX, touch.clientY);
            touchStartRef.current = null;
            if (!direction) return;
            const total = slides.length;
            if (direction === 'left') {
                attemptSlide(slideNumber === total - 1 ? 0 : slideNumber + 1);
            } else {
                attemptSlide(slideNumber === 0 ? total - 1 : slideNumber - 1);
            }
        }, [slideNumber, slides.length, attemptSlide]);

        /**
         * @function handleKeyDown
         * @description Moves to the next/previous slide on arrow-key presses, matching the slider's orientation.
         */
        const handleKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
            const forwardKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
            const backwardKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
            const total = slides.length;
            if (e.key === forwardKey) {
                e.preventDefault();
                attemptSlide(slideNumber === total - 1 ? 0 : slideNumber + 1);
            } else if (e.key === backwardKey) {
                e.preventDefault();
                attemptSlide(slideNumber === 0 ? total - 1 : slideNumber - 1);
            }
        }, [orientation, slideNumber, slides.length, attemptSlide]);

        const slideshowStyle = buildSlideshowStyle({ id, spacing, orientation, count: slides.length });

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
                <div className="prismal-slider-slides" tabIndex={0}
                    onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
                    { slideList }
                </div>
            </div>
        </div>
    } else {
        const { children } = props;
        const children_ = Children.toArray(children).filter(el => !!el);

        const renderElements = useCallback( (onSelect: (i: number) => void) => {

            let labels: JSX.Element[] = [],
                navArrowsPrevious: JSX.Element[] = [],
                navArrowsNext: JSX.Element[] = [],
                inputCtrls: JSX.Element[] = [];

            let slideList = children_.map( (slide, i) => {
                labels.push( renderLabel(i) );
                navArrowsPrevious.push( renderNavArrow(i, 'previous') );
                navArrowsNext.push( renderNavArrow(i, 'next') );
                inputCtrls.push( renderInputCtrl(i, onSelect) );
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
        }, [children_, renderInputCtrl, renderLabel, renderNavArrow]);

        const [slideNumber, setSlide] = useState<number>(selected ?? 0);
        const [isFocused, setIsFocused] = useState(false);

        // See the `type === "process"` branch's identical comment above — same gate,
        // duplicated here since this branch keeps its own separate state/effects.
        const attemptSlide = useCallback((next: number) => {
            if (canAdvance && !canAdvance(slideNumber, next)) {
                if (inputCtrlList.current[slideNumber]) inputCtrlList.current[slideNumber].checked = true;
                return;
            }
            setSlide(next);
        }, [canAdvance, slideNumber]);

        const { labels, inputCtrls, navArrowsNext, navArrowsPrevious, slideList } = renderElements(attemptSlide);

        useEffect(() => {
            if (inputCtrlList.current[slideNumber]) {
                inputCtrlList.current[slideNumber].checked = true;
            } else {
                console.log("Error, slide non existing", {list: inputCtrlList.current, slideNumber})
            }
        },[slideNumber])

        // Syncs internal state when the controlled `selected` prop changes externally.
        useEffect(() => {
            if (selected !== undefined && selected !== slideNumber) {
                setSlide(selected);
            }
        }, [selected]);

        // Notifies consumers whenever the active slide changes, regardless of source.
        useEffect(() => {
            onChange?.(slideNumber);
        }, [slideNumber, onChange]);

        useEffect( () => {
            // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setInterval>` for browser compatibility.
            let interval: ReturnType<typeof setInterval>;
            // When the reference of the last input is added, start autoplay.
            // Paused while the slider has focus, and reset on every slide change (this effect
            // re-runs whenever slideNumber changes, tearing down and rescheduling the interval).
            if (inputCtrlList.current.length == inputCtrls.length && autoPlay && !isFocused) {
                interval = setInterval(() => {
                    if (slideNumber < (inputCtrlList.current.length-1)) {
                        attemptSlide(slideNumber+1)
                    } else {
                        attemptSlide(0)
                    }
                }, autoPlay);
            }
            return () => {
                if (interval) {
                    clearInterval(interval)
                }
            }
        }, [inputCtrlList.current.length, slideNumber, autoPlay, inputCtrls.length, isFocused, attemptSlide]);

        const handleTouchEnd = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
            if (!touchStartRef.current) return;
            const touch = e.changedTouches[0];
            const direction = getSwipeDirection(touchStartRef.current.x, touchStartRef.current.y, touch.clientX, touch.clientY);
            touchStartRef.current = null;
            if (!direction) return;
            const total = children_.length;
            if (direction === 'left') {
                attemptSlide(slideNumber === total - 1 ? 0 : slideNumber + 1);
            } else {
                attemptSlide(slideNumber === 0 ? total - 1 : slideNumber - 1);
            }
        }, [slideNumber, children_.length, attemptSlide]);

        /**
         * @function handleKeyDown
         * @description Moves to the next/previous slide on arrow-key presses, matching the slider's orientation.
         */
        const handleKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
            const forwardKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
            const backwardKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
            const total = children_.length;
            if (e.key === forwardKey) {
                e.preventDefault();
                attemptSlide(slideNumber === total - 1 ? 0 : slideNumber + 1);
            } else if (e.key === backwardKey) {
                e.preventDefault();
                attemptSlide(slideNumber === 0 ? total - 1 : slideNumber - 1);
            }
        }, [orientation, slideNumber, children_.length, attemptSlide]);

        const slideshowStyle = buildSlideshowStyle({ id, spacing, orientation, count: children_.length });

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
                <div className="prismal-slider-slides" tabIndex={0}
                    onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
                    { slideList }
                </div>
            </div>
        </div>
    }
}

export default Slider;
