import { InputProps, InputRefType } from "../types";
import {
    ReactNode, CSSProperties, useState, useEffect,
    useCallback, useMemo, useImperativeHandle,
    forwardRef, ForwardedRef, useRef, ChangeEvent
} from "react";
import { setBorderRadius, setAccentStyle } from 'utils/';

import "./index.scss";  

export interface NumberInputProps extends InputProps {
    onChange?: (arg?: number) => void;
    placeholder?: string;
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    step?: number;
    value?: number;
}
const NumberInput = forwardRef((props: NumberInputProps, ref: ForwardedRef<InputRefType>) => {
    const {
        "data-id": dataId,
        name, id,
        onChange,
        validator,
        required = false,
        readOnly = false,
        disabled = false,
        inline = false,
        type = "default",
        placeholder, before, after,
        label, labelPosition = "before",
        labelSeparator = ':',
        value, step =  0,
        className, style,
        accent, accentDark, accentLight,
        borderRadius, gridPlacement
    } = props;

    let style_: CSSProperties = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    if (style) style_ = {...style_, ...style};

    if (gridPlacement) {
        if (typeof gridPlacement == "string") {
            style_["gridArea"] = gridPlacement;
        } else if (typeof gridPlacement == "object") {
            if (gridPlacement.column) style_["gridColumn"] = gridPlacement.column;
            if (gridPlacement.row) style_["gridRow"] = gridPlacement.row;
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const [ isNotValid_, markNotValid ] = useState<(string | boolean)[]>([]);
    const isNotValid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    const checkValidity = useCallback( () => {
        const value = inputRef?.current?.value;
        let errorMessages = [];

        // If provided, perform validator method
        if (validator) {
            let result = validator(value!);
            // When the validator returns true or message
            // is invalid
            if (result) errorMessages.push(result);
        }
        // When field is required and is missing value, add the error
        if (required && !value) errorMessages.push('This field is mandatory');
        markNotValid(errorMessages);
        return errorMessages;
    }, [validator, required]);
    
    useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name: name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => inputRef.current?.value,
        element: inputRef.current
    }), [name]);

    const className_ = useMemo(() => {
        let className_ = "prismal-input-number";
        if (className) className_ = `${className_} ${className}`;
        if ( inline ) className_ = `${className_} inline`;
        if ( isNotValid_.length ) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, inline, isNotValid_]);

    /** Transforms 'isNotvalid' array of errors into a list
     */
    const renderedErrors = useMemo( () => isNotValid_.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isNotValid_]);

    let inputClass = "prismal-input";
    inputClass = `${inputClass} prismal-input-${type}`;

    const doOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const evtValue = Number(event.currentTarget.value);
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, checkValidity]);

    const label_ = useMemo(() => {
        if (label) {
            if (labelPosition == "before") {
                return <label htmlFor={id}>{label}{labelSeparator}</label>
            } else {
                return <label>{labelSeparator}{label}</label>
            }
        } else return null;
    }, [id, label, labelSeparator, labelPosition]);

    return <div style={style_} data-id={dataId} className={className_}>
        { labelPosition == "before" ? <>{label_}</> : <></> }
        <div className={inputClass}>
            {before}
            <input ref={inputRef} onChange={doOnChange}
                type="number" id={id} name={name}
                placeholder={placeholder}
                readOnly={readOnly}
                disabled={disabled}
                required={required}
                defaultValue={value}
                step={step}
            />
            {after}
        </div>
        { labelPosition == "after" ? <>{label_}</> : <></> }
        {renderedErrors.length ? <ul className='input-errors'>
            { renderedErrors }
        </ul> : <></>}
    </div>
});

export default NumberInput;