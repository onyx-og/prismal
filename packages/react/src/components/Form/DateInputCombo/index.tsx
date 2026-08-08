import {
    CSSProperties, ReactNode, ChangeEvent,
    forwardRef, ForwardedRef, useImperativeHandle,
    useState, useEffect, useCallback, useMemo, useRef
} from "react";
import { InputProps, InputRefType } from "../types";
import { setBorderRadius, setAccentStyle } from "utils/";
import "./index.scss";

/**
 * @typedef {object} DateRange
 * @description A pair of dates, in YYYY-MM-DD format, describing an interval.
 */
export interface DateRange {
    /** The start date of the interval, in YYYY-MM-DD format. */
    from?: string;
    /** The end date of the interval, in YYYY-MM-DD format. */
    to?: string;
}

/**
 * @typedef {object} DateInputComboProps
 * @description Props for the DateInputCombo component.
 */
export interface DateInputComboProps extends Omit<InputProps, "value" | "onChange" | "validator" | "placeholder"> {
    /** The earliest selectable date, in YYYY-MM-DD format. */
    min?: string;
    /** The latest selectable date, in YYYY-MM-DD format. */
    max?: string;
    /** The initial value of the interval. */
    value?: DateRange;
    /** The accessible label for the start date field. */
    fromLabel?: string;
    /** The accessible label for the end date field. */
    toLabel?: string;
    /** Element displayed between the two date fields. */
    separator?: ReactNode;
    /** Callback for when either date of the interval changes. */
    onChange?: (arg?: DateRange) => void;
    /** A function to validate the interval's value. */
    validator?: (arg?: DateRange) => boolean | string;
    /** The visual style of the inputs. */
    type?: 'default' | 'primary';
}

/**
 * @component DateInputCombo
 * @description A pair of date inputs for forms, used to select a date interval (a "from" and "to" date).
 * @param {DateInputComboProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the combo.
 * @returns {React.ReactElement} The rendered DateInputCombo component.
 * @example
 * <DateInputCombo label="Stay dates" name="stay" min="2026-01-01" />
 */
const DateInputCombo = forwardRef((props: DateInputComboProps, ref: ForwardedRef<InputRefType>) => {
    const {
        "data-id": dataId,
        id, name,
        min, max,
        onChange, validator,
        required = false,
        readOnly = false,
        disabled = false,
        inline = false,
        type = "default",
        label, labelPosition = "before",
        labelSeparator = ":",
        labelClass,
        fromLabel = "From", toLabel = "To",
        separator = "–",
        value,
        className, style,
        accent, accentDark, accentLight,
        borderRadius, gridPlacement
    } = props;

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

    const fromRef = useRef<HTMLInputElement>(null);
    const toRef = useRef<HTMLInputElement>(null);

    // Tracks each field's current value so the other field's bounds
    // (the "to" field can't be before "from", and vice versa) stay live.
    const [fromValue, setFromValue] = useState(value?.from);
    const [toValue, setToValue] = useState(value?.to);

    const [isNotValid_, markNotValid] = useState<(string | boolean)[]>([]);
    const isNotValid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    /**
     * @function checkValidity
     * @description Checks the validity of the interval: required fields, min/max bounds,
     * chronological order (from <= to), and the custom validator.
     * @returns {(string | boolean)[]} An array of error messages, or an empty array if valid.
     */
    const checkValidity = useCallback(() => {
        const from = fromRef?.current?.value;
        const to = toRef?.current?.value;
        let errorMessages: (string | boolean)[] = [];

        if (required && (!from || !to)) errorMessages.push('This field is mandatory');
        if (from && min && from < min) errorMessages.push(`Start date must be on or after ${min}`);
        if (to && max && to > max) errorMessages.push(`End date must be on or before ${max}`);
        if (from && to && to < from) errorMessages.push('End date must be on or after the start date');
        // If provided, perform validator method
        if (validator) {
            let result = validator({ from, to });
            // When the validator returns a message or false
            // is invalid
            if (result) errorMessages.push(result);
        }
        markNotValid(errorMessages);
        return errorMessages;
    }, [validator, required, min, max]);

    useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name: name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => ({ from: fromRef.current?.value, to: toRef.current?.value }),
        element: fromRef.current
    }), [name, checkValidity]);

    const className_ = useMemo(() => {
        let className_ = "prismal-input-date-combo";
        if (className) className_ = `${className_} ${className}`;
        if (inline) className_ = `${className_} inline`;
        if (required) className_ = `${className_} input-required`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, inline, required, isNotValid_]);

    /**
     * @function doOnChangeFrom
     * @description Handles the "from" field's change event, triggers validation, and calls the onChange prop.
     * @param {ChangeEvent<HTMLInputElement>} event The input change event.
     */
    const doOnChangeFrom = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const evtValue = event.currentTarget.value;
        setFromValue(evtValue);
        checkValidity();
        onChange && onChange({ from: evtValue, to: toRef.current?.value });
    }, [onChange, disabled, checkValidity]);

    /**
     * @function doOnChangeTo
     * @description Handles the "to" field's change event, triggers validation, and calls the onChange prop.
     * @param {ChangeEvent<HTMLInputElement>} event The input change event.
     */
    const doOnChangeTo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const evtValue = event.currentTarget.value;
        setToValue(evtValue);
        checkValidity();
        onChange && onChange({ from: fromRef.current?.value, to: evtValue });
    }, [onChange, disabled, checkValidity]);

    /**
     * @member label_
     * @description Memoized label element for the combo.
     * @returns {JSX.Element | null}
     */
    const label_ = useMemo(() => {
        if (label) {
            let labelClass_ = "prismal-input-date-combo-label";
            if (labelClass) labelClass_ = `${labelClass_} ${labelClass}`;
            if (labelPosition == "before") {
                return <label className={labelClass_}>{label}{labelSeparator}</label>
            }
            return <label className={labelClass_}>{labelSeparator}{label}</label>
        }
        return null;
    }, [label, labelClass, labelSeparator, labelPosition]);

    let inputClass = "prismal-input";
    inputClass = `${inputClass} prismal-input-${type}`;

    /**
     * @member renderedErrors
     * @description Transforms 'isNotValid_' array of errors into a list of error messages.
     * @returns {JSX.Element[]}
     */
    const renderedErrors = useMemo(() => isNotValid_.map((err, i) =>
        <li key={i}>{typeof err === 'string' ? err : 'Check this field'}</li>
    ), [isNotValid_]);

    return <div style={style_} data-id={dataId} className={className_}>
        {labelPosition == "before" ? label_ : null}
        <div className="prismal-input-date-combo-fields">
            <div className={inputClass}>
                <input ref={fromRef} onChange={doOnChangeFrom}
                    type="date" id={id ? `${id}-from` : undefined}
                    name={name ? `${name}-from` : undefined}
                    aria-label={fromLabel}
                    min={min} max={toValue || max}
                    readOnly={readOnly}
                    aria-readonly={readOnly}
                    disabled={disabled}
                    required={required}
                    aria-required={required}
                    defaultValue={value?.from}
                />
            </div>
            <span className="prismal-input-date-combo-separator">{separator}</span>
            <div className={inputClass}>
                <input ref={toRef} onChange={doOnChangeTo}
                    type="date" id={id ? `${id}-to` : undefined}
                    name={name ? `${name}-to` : undefined}
                    aria-label={toLabel}
                    min={fromValue || min} max={max}
                    readOnly={readOnly}
                    aria-readonly={readOnly}
                    disabled={disabled}
                    required={required}
                    aria-required={required}
                    defaultValue={value?.to}
                />
            </div>
        </div>
        {labelPosition == "after" ? label_ : null}
        {renderedErrors.length ? <ul className='input-errors'>
            {renderedErrors}
        </ul> : null}
    </div>
});
DateInputCombo.displayName = "DateInputCombo";
export default DateInputCombo;
