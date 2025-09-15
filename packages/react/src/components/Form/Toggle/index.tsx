import {
    ReactElement, useRef, useState, useCallback,
    useMemo, useEffect, ForwardedRef, forwardRef,
    CSSProperties, ChangeEvent, useImperativeHandle
} from "react";
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
const Toggle = forwardRef((props: ToggleProps, ref: ForwardedRef<InputRefType>): ReactElement => {
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
        borderRadius = "sm", onChange,
        validator, gridPlacement
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

    useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => inputRef.current?.checked,
        element: inputRef.current
    }), [isNotValid, name]);

    const doOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const evtValue = event.currentTarget.checked;
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, checkValidity]);

    const label_ = useMemo(() => {
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


    const input = useMemo(() => {
        let inputClass_ = "prismal-toggle-input";
        if (type == "switch") inputClass_ = `${inputClass_} prismal-toggle-switch`;
        else inputClass_ = `${inputClass_} prismal-toggle-checkbox`;

        return <input ref={inputRef} onChange={doOnChange}
            name={name} id={id} type="checkbox" defaultChecked={checked}
            disabled={disabled} required={required}
            className={inputClass_} readOnly={readOnly}
        />
    }, [disabled, required, readOnly, id, name, checked, doOnChange, type]);

    const className_ = useMemo(() => {
        let className_ = "prismal-toggle";
        if (className) className_ = `${className_} ${className}`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, isNotValid_]);

    /** Transforms 'isNotvalid' array of errors into a list
     */
    const renderedErrors = useMemo( () => isNotValid_.map( (err, i) => 
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