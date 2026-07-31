import {
    CSSProperties, ChangeEvent, ForwardedRef, forwardRef,
    useCallback, useEffect, useImperativeHandle, useMemo,
    useRef, useState
} from "react";
import { InputProps, InputRefType } from "../types";
import { setAccentStyle, setBorderRadius } from "utils/";
import "./index.scss";

/**
 * @typedef {object} RangeProps
 * @description Props for the Range component.
 */
export interface RangeProps extends InputProps {
    /** The orientation of the range slider. */
    type?: "horizontal" | "vertical";
    /** The minimum value of the range. */
    min?: number;
    /** The maximum value of the range. */
    max?: number;
    /** The step increment of the range. */
    step?: number;
    /** The initial value of the range. */
    value?: number;
    /** Callback for when the range value changes. */
    onChange?: (arg?: number) => void;
    /** If true, displays the current value indicator. */
    showIndicator?: boolean;
    /** If true, renders a dot marker at the current value's position on the track. */
    dot?: boolean;
    /** If true, displays the max value indicator. */
    showMaxIndicator?: boolean;
    /** A suffix appended to the displayed value, or a function that returns one. */
    suffix?: string | ((value: number) => string);
    /** A function to format the displayed value. */
    indicatorFn?: (value: number) => string;
}

/**
 * @component Range
 * @description A range slider input component for forms.
 * @param {RangeProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered Range component.
 * @example
 * <Range label="Volume" name="volume" min={0} max={100} showIndicator suffix="%" />
 */
const Range = forwardRef((props: RangeProps, ref: ForwardedRef<InputRefType>) => {
    const {
        "data-id": dataId,
        id, name,
        type = "horizontal",
        min = 0, max = 100, step = 1,
        value = 0,
        onChange, validator,
        required = false,
        disabled = false,
        readOnly = false,
        label, labelPosition = "before",
        labelSeparator = ":",
        labelClass,
        showIndicator, showMaxIndicator,
        dot = false,
        suffix, indicatorFn,
        className, style,
        accent, accentDark, accentLight,
        borderRadius, gridPlacement
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [currentValue, setCurrentValue] = useState(value);

    const [isNotValid_, markNotValid] = useState<(string | boolean)[]>([]);
    const isNotValid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    /**
     * @function checkValidity
     * @description Checks the validity of the range input based on the validator and required props.
     * @returns {(string | boolean)[]} An array of error messages, or an empty array if valid.
     */
    const checkValidity = useCallback(() => {
        const value = inputRef?.current?.value;
        let errorMessages = [];
        if (validator) {
            let result = validator(value !== undefined ? Number(value) : undefined);
            if (result) errorMessages.push(result);
        }
        if (required && !value) errorMessages.push('This field is mandatory');
        markNotValid(errorMessages);
        return errorMessages;
    }, [validator, required]);

    useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => {
            const value = inputRef.current?.value;
            return value !== undefined ? Number(value) : undefined;
        },
        element: inputRef.current
    }), [name, checkValidity]);

    /**
     * @function doOnChange
     * @description Handles the range input's change event, triggers validation, and calls the onChange prop.
     * @param {ChangeEvent<HTMLInputElement>} event The input change event.
     */
    const doOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (readOnly) return;
        const evtValue = Number(event.currentTarget.value);
        setCurrentValue(evtValue);
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, checkValidity, readOnly]);

    let style_: CSSProperties = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);

    if (style) style_ = { ...style_, ...style };

    if (gridPlacement) {
        if (typeof gridPlacement == "string") {
            style_["gridArea"] = gridPlacement;
        } else if (typeof gridPlacement == "object") {
            if (gridPlacement.column) style_["gridColumn"] = gridPlacement.column;
            if (gridPlacement.row) style_["gridRow"] = gridPlacement.row;
        }
    }

    const className_ = useMemo(() => {
        let className_ = `prismal-input-range ${type}`;
        if (className) className_ = `${className_} ${className}`;
        if (disabled) className_ = `${className_} disabled`;
        if (readOnly) className_ = `${className_} read-only`;
        if (required) className_ = `${className_} input-required`;
        if (dot) className_ = `${className_} dot`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, type, disabled, readOnly, required, dot, isNotValid_]);

    /**
     * @member label_
     * @description Memoized label element for the range input.
     * @returns {JSX.Element | null}
     */
    const label_ = useMemo(() => {
        if (label) {
            let labelClass_ = "prismal-input-range-label";
            if (labelClass) labelClass_ = `${labelClass_} ${labelClass}`;
            if (labelPosition == "before") {
                return <label htmlFor={id} className={labelClass_}>{label}{labelSeparator}</label>
            }
            return <label htmlFor={id} className={labelClass_}>{labelSeparator}{label}</label>
        }
        return null;
    }, [id, label, labelClass, labelSeparator, labelPosition]);

    /**
     * @member currentIndicator
     * @description Memoized element displaying the current value of the range.
     * @returns {JSX.Element | null}
     */
    const currentIndicator = useMemo(() => {
        if (showIndicator) {
            let _value;
            if (indicatorFn) _value = currentValue >= max ? indicatorFn(max) : indicatorFn(currentValue);
            else _value = currentValue >= max ? max.toString() : currentValue.toString();
            if (suffix) {
                let _suffix = suffix;
                if (typeof suffix == "function") _suffix = suffix(currentValue);
                _value = `${_value} ${_suffix}`;
            }
            return <div className="current-value">{_value}</div>
        }
        return null;
    }, [showIndicator, currentValue, max, suffix, indicatorFn]);

    const percentVal = useMemo(() => {
        if (max === min) return 0;
        return ((currentValue - min) * 100) / (max - min);
    }, [currentValue, min, max]);

    /**
     * @member renderedErrors
     * @description Transforms 'isNotValid_' array of errors into a list of error messages.
     * @returns {JSX.Element[]}
     */
    const renderedErrors = useMemo(() => isNotValid_.map((err, i) =>
        <li key={i}>{typeof err === 'string' ? err : 'Check this field'}</li>
    ), [isNotValid_]);

    return <div style={style_} className={className_} data-id={dataId}>
        {labelPosition == "before" ? label_ : null}
        <div className="prismal-input-range-control">
            {currentIndicator}
            <div className="bar-container">
                <div className="progress" style={{
                    [type == "vertical" ? "height" : "width"]: `${percentVal}%`
                }}></div>
            </div>
            <input ref={inputRef} onChange={doOnChange}
                type="range" id={id} name={name}
                min={min} max={max} step={step}
                defaultValue={value}
                disabled={disabled}
                readOnly={readOnly}
                aria-readonly={readOnly}
                required={required}
                tabIndex={readOnly ? -1 : undefined}
            />
            {showMaxIndicator ? <div className="total-value">
                {indicatorFn ? indicatorFn(max) : max}
            </div> : null}
        </div>
        {labelPosition == "after" ? label_ : null}
        {renderedErrors.length ? <ul className='input-errors'>
            {renderedErrors}
        </ul> : null}
    </div>
});
Range.displayName = "Range";
export default Range;
