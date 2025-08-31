import { InputProps, InputRefType } from "../types";
import React from "react";
import { setBorderRadius, setAccentStyle } from 'utils/';

import "./index.scss";  

export interface NumberInputProps extends InputProps {
    onChange?: (arg?: number) => void;
    placeholder?: string;
    after?: React.ReactNode;
    before?: React.ReactNode;
    type?: 'default' | 'primary';
    step?: number;
    value?: number;
}
const NumberInput = React.forwardRef((props: NumberInputProps, ref: React.ForwardedRef<InputRefType>) => {
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
        borderRadius
    } = props;

    let style_: {[key: string]: any} = {...style};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [ isNotValid_, markNotValid ] = React.useState<(string | boolean)[]>([]);
    const isNotValid = React.useRef<(string | boolean)[]>([]);

    React.useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    const checkValidity = React.useCallback( () => {
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
    
    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name: name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => inputRef.current?.value,
        element: inputRef.current
    }), [name]);

    const className_ = React.useMemo(() => {
        let className_ = "prismal-input-number";
        if (className) className_ = `${className_} ${className}`;
        if ( inline ) className_ = `${className_} inline`;
        if ( isNotValid_.length ) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, inline, isNotValid_]);

    /** Transforms 'isNotvalid' array of errors into a list
     */
    const renderedErrors = React.useMemo( () => isNotValid_.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isNotValid_]);

    let inputClass = "prismal-input";
    inputClass = `${inputClass} prismal-input-${type}`;

    const doOnChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const evtValue = Number(event.currentTarget.value);
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, checkValidity]);

    const label_ = React.useMemo(() => {
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