import {
    CSSProperties, ReactNode, ChangeEvent,
    forwardRef, ForwardedRef, useImperativeHandle,
    useState, useEffect, useCallback, useMemo, useRef
} from "react";
import { InputProps, InputRefType } from "../types";
import { setBorderRadius, setAccentStyle } from "utils/";
import "./index.scss";

/**
 * @typedef {object} DateInputProps
 * @description Props for the DateInput component.
 */
export interface DateInputProps extends InputProps {
    /** The earliest selectable date, in YYYY-MM-DD format. */
    min?: string;
    /** The latest selectable date, in YYYY-MM-DD format. */
    max?: string;
    /** The initial value of the input, in YYYY-MM-DD format. */
    value?: string;
    /** Callback for when the date value changes. */
    onChange?: (arg?: string) => void;
    /** Element to display after the input. */
    after?: ReactNode;
    /** Element to display before the input. */
    before?: ReactNode;
    /** The visual style of the input. */
    type?: 'default' | 'primary';
}

/**
 * @component DateInput
 * @description A date input component for forms, with min/max bounds and validation.
 * @param {DateInputProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered DateInput component.
 * @example
 * <DateInput label="Event date" name="event-date" min="2026-01-01" />
 */
const DateInput = forwardRef((props: DateInputProps, ref: ForwardedRef<InputRefType>) => {
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
        before, after,
        label, labelPosition = "before",
        labelSeparator = ":",
        labelClass,
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

    const inputRef = useRef<HTMLInputElement>(null);

    const [isNotValid_, markNotValid] = useState<(string | boolean)[]>([]);
    const isNotValid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    /**
     * @function checkValidity
     * @description Checks the validity of the date input based on min/max bounds, the validator and required props.
     * @returns {(string | boolean)[]} An array of error messages, or an empty array if valid.
     */
    const checkValidity = useCallback(() => {
        const value = inputRef?.current?.value;
        let errorMessages = [];

        if (required && !value) errorMessages.push('This field is mandatory');
        if (value && min && value < min) errorMessages.push(`Date must be on or after ${min}`);
        if (value && max && value > max) errorMessages.push(`Date must be on or before ${max}`);
        // If provided, perform validator method
        if (validator) {
            let result = validator(value!);
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
        getValue: () => inputRef.current?.value,
        element: inputRef.current
    }), [name, checkValidity]);

    const className_ = useMemo(() => {
        let className_ = "prismal-input-date";
        if (className) className_ = `${className_} ${className}`;
        if (inline) className_ = `${className_} inline`;
        if (required) className_ = `${className_} input-required`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, inline, required, isNotValid_]);

    /**
     * @function doOnChange
     * @description Handles the input's change event, triggers validation, and calls the onChange prop.
     * @param {ChangeEvent<HTMLInputElement>} event The input change event.
     */
    const doOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const evtValue = event.currentTarget.value;
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, disabled, checkValidity]);

    /**
     * @member label_
     * @description Memoized label element for the input.
     * @returns {JSX.Element | null}
     */
    const label_ = useMemo(() => {
        if (label) {
            let labelClass_ = "prismal-input-date-label";
            if (labelClass) labelClass_ = `${labelClass_} ${labelClass}`;
            if (labelPosition == "before") {
                return <label htmlFor={id} className={labelClass_}>{label}{labelSeparator}</label>
            }
            return <label htmlFor={id} className={labelClass_}>{labelSeparator}{label}</label>
        }
        return null;
    }, [id, label, labelClass, labelSeparator, labelPosition]);

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
        <div className={inputClass}>
            {before}
            <input ref={inputRef} onChange={doOnChange}
                type="date" id={id} name={name}
                min={min} max={max}
                readOnly={readOnly}
                aria-readonly={readOnly}
                disabled={disabled}
                required={required}
                aria-required={required}
                defaultValue={value}
            />
            {after}
        </div>
        {labelPosition == "after" ? label_ : null}
        {renderedErrors.length ? <ul className='input-errors'>
            {renderedErrors}
        </ul> : null}
    </div>
});
DateInput.displayName = "DateInput";
export default DateInput;
