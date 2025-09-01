import React from 'react';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { InputProps, InputRefType } from '../types';
import { setBorderRadius } from 'utils/';
export interface TextInputProps extends InputProps {
    // TODO: Extend with other compatible types
    htmlType?: 'text' | 'email' | 'password';
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string) => void;
    // TODO: Consider moving to InputProps
    size?: 's' | 'm' | 'l';
    after?: React.ReactNode;
    before?: React.ReactNode;
    type?: 'default' | 'primary';
    placeholder?: string;
}
const TextInput = React.forwardRef( ( props: TextInputProps, ref: React.ForwardedRef<InputRefType> ) => {
    const { 
        name, id,
        size = 'm',
        htmlType = 'text',
        onChange,
        onPressEnter,
        validator,
        required = false,
        placeholder,
        label,
        inline = false,
        labelSeparator = ':',
        value,
        className, style,
        disabled = false,
        after, before,
        accent, accentDark, accentLight,
        borderRadius,
        type = 'default', gridPlacement
    } = props;
    
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [ isInvalid_, markInvalid ] = React.useState<(string | boolean)[]>([]);
    const isInvalid = React.useRef<(string | boolean)[]>([]);

    React.useEffect(() => {
        isInvalid.current = isInvalid_;
    }, [isInvalid_]);

    /* Adds new properties to the returned ref:
     * a method to know whether the component is valid or not.
     * a method to trigger the field validation
     */
    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name: name,
        checkValidity,
        getValidity: () => isInvalid.current,
        getValue: () => inputRef.current?.value,
        element: inputRef.current
    }), [name]);

    let className_ = React.useMemo(() => {
        let className_ = 'prismal-input-text';

        if (className) className_ = `${className_} ${className}`;
        if ( required ) className_ = `${className_} input-required`;
        className_ = `${className_} size-${size}`;
        if ( isInvalid_.length ) className_ = `${className_} input-invalid`;
        if ( inline ) className_ = `${className_} inline`;

        return className_
    }, [className, required, isInvalid_, inline]);

    let inputClass = "prismal-input";
    inputClass = `${inputClass} prismal-input-${type}`;

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
        markInvalid(errorMessages);
        return errorMessages;
    }, [validator, required]);

    const onValueChange = React.useCallback( () => {
        if (!disabled) {
            const value = inputRef?.current?.value;
            onChange && onChange(value);
            checkValidity();
        }
    }, [onChange, disabled, checkValidity]);

    const onKeyUp = React.useCallback( (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) {
            // avoid
        } else if ( e.key == 'Enter' && onPressEnter) {
            const value = inputRef?.current?.value;
            onPressEnter(value);
        }
    }, [onPressEnter, disabled])

    /** Transforms 'isNotvalid' array of errors into a list
     */
    const renderedErrors = React.useMemo( () => isInvalid_.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isInvalid_]);

    let style_: React.CSSProperties = {...style};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    if (gridPlacement) {
        if (typeof gridPlacement == "string") {
            style_["gridArea"] = gridPlacement;
        } else if (typeof gridPlacement == "object") {
            if (gridPlacement.column) style_["gridColumn"] = gridPlacement.column;
            if (gridPlacement.row) style_["gridRow"] = gridPlacement.row;
        }
    }

    // [TODO] Separate distinct blocks
    return <div
        className={className_}
        style={style_}
    >
        { label ? 
            <label className='input-text-label' htmlFor={name}>{`${label}${labelSeparator}`}</label>
            : <></>
        }
        <div className={inputClass}>
            {before}
            <input ref={inputRef}
                name={name}
                type={htmlType}
                disabled={disabled}
                onChange={onValueChange}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                defaultValue={value}
                required={required}
                role='textbox'
                aria-required={required}
            />
            {after}
        </div>
        { renderedErrors.length ? <ul className='input-errors'>
            { renderedErrors }
        </ul> : <></>}
    </div>;
});

export default TextInput;