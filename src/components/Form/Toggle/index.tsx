import React, { ReactElement } from "react";
import { InputProps, InputRefType } from '../types';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setBoxElevation } from 'utils/';
import "./index.scss";



// [TODO] Disabled and required can be applied through selector
// change behaviour for other inputs

export interface ToggleProps extends InputProps {
    type?: "checkbox" | "switch";
    checked?: boolean;
    placeholder?: never;
    value?: never;
    inline?: never;
    onChange?: (value: boolean) => any;
}
/**
 * @credits Inspired by Aaron Iker switch/checkbox
 */
const Toggle = React.forwardRef((props: ToggleProps, ref: React.ForwardedRef<InputRefType>): ReactElement => {
    const {
        type = "checkbox",
        id, name, className,
        checked = false,
        disabled = false,
        required =  false,
        readOnly = false,
        labelPosition = "after",
        label, labelSeparator, labelClass,
        style, accent, accentLight, accentDark,
        borderRadius = "small", onChange,
        validator, 
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
        const value = inputRef?.current?.checked;
        let errorMessages = [];
        // If provided, perform validator method
        if (validator) {
            let result = validator(value!);
            // When the validator returns true or message
            // is invalid
            if (result) errorMessages.push(result);
        }
        // When field is required and is missing value, add the error
        if (required && !value) errorMessages.push('This checkbox is mandatory');
        markNotValid(errorMessages);
        return errorMessages;
    }, [validator, required]);

    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => inputRef.current?.checked,
        element: inputRef.current
    }), [isNotValid, name]);

    const doOnChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const evtValue = event.currentTarget.checked;
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, checkValidity]);

    const label_ = React.useMemo(() => {
        if (label) {
            let labelClass_ = "prismal-toggle-label";
            if (labelClass) labelClass_ = `${labelClass_} ${labelClass}`;
            if (labelSeparator) {
                return <label htmlFor={id} className={labelClass_}>
                    { labelPosition == "after" ? <>{labelSeparator}{label}</> 
                        : <>{label}{labelSeparator}</>
                    }
                </label>
            }
            return <label htmlFor={id} className={labelClass_}>{label}</label>;
        }
        return null;
    }, [label, id, labelSeparator, labelPosition, labelClass]);


    const input = React.useMemo(() => {
        let inputClass_ = "prismal-toggle-input";
        if (type == "switch") inputClass_ = `${inputClass_} prismal-toggle-switch`;
        else inputClass_ = `${inputClass_} prismal-toggle-checkbox`;

        return <input ref={inputRef} onChange={doOnChange}
            name={name} id={id} type="checkbox" defaultChecked={checked}
            disabled={disabled} required={required}
            className={inputClass_} readOnly={readOnly}
        />
    }, [disabled, required, readOnly, id, name, checked, doOnChange, type]);

    const className_ = React.useMemo(() => {
        let className_ = "prismal-toggle";
        if (className) className_ = `${className_} ${className}`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, isNotValid_]);

    /** Transforms 'isNotvalid' array of errors into a list
     */
    const renderedErrors = React.useMemo( () => isNotValid_.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isNotValid_]);

    return <div style={style_} className={className_}>
        {labelPosition == "after" ? <>{input}{label_}</>
            : <>{label_}{input}</>
        }
        {renderedErrors.length ? <ul className='input-errors'>
            { renderedErrors }
        </ul> : <></>}
    </div>
});

export default Toggle;