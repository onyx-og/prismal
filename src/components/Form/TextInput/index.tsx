import React from 'react';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { InputProps, InputRefType } from '../types';
export interface TextInputProps extends InputProps {
    // TODO: Extend with other compatible types
    type: 'text' | 'email' | 'password';
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string) => void;
    // TODO: Consider moving to InputProps
    size?: 's' | 'm' | 'l';
}
const TextInput = React.forwardRef( ( props: TextInputProps, ref: React.ForwardedRef<InputRefType> ) => {
    const { 
        name, id,
        size = 'm',
        type,
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
        accent, accentDark, accentLight,
    } = props;
    
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [ isInvalid, markInvalid ] = React.useState<(string | boolean)[]>([]);

    /* Adds new properties to the returned ref:
     * a method to know whether the component is valid or not.
     * a method to trigger the field validation
     */
    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        checkValidity,
        getValidity: () => isInvalid,
        current: inputRef.current
    }), [isInvalid]);

    let inputClass = 'prismal-input-text',
        inputWrapperClass = 'input-wrapper';

    if (className) inputClass = `${inputClass} ${className}`;

    if ( inline ) inputWrapperClass = `${inputWrapperClass} inline`;

    if ( required ) inputClass = `${inputClass} input-required`;

    if ( isInvalid.length ) inputClass = `${inputClass} input-invalid`;

    inputClass = `${inputClass} size-${size}`;

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
    }, [inputRef.current, validator, required]);

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

    /* Transforms 'isInvalid' array of errors into a list
     */
    const renderedErrors = React.useMemo( () => isInvalid.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isInvalid]);

    let style_: {[key: string]: any} = {...style};
    setAccentStyle(style_, {accent, accentLight, accentDark});

    // [TODO] Separate distinct blocks into single useMemo and return out of the hook
    return React.useMemo( () => <div
        className={inputClass}
        style={style_}
    >
        <div className={inputWrapperClass}>
            { label ? 
                <label className='input-text-label' htmlFor={name}>{`${label}${labelSeparator}`}</label>
                : <></>
            }
            <input ref={inputRef}
                name={name}
                type={type}
                disabled={disabled}
                onChange={onValueChange}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                defaultValue={value}
                required={required}
                role='textbox'
                aria-required={required}
            />
            { isInvalid.length ? <ul className='input-errors'>
                { renderedErrors }
            </ul> : <></>}
        </div>
    </div>, [name, style_, type, disabled, onValueChange, onKeyUp, placeholder, value, required, isInvalid, renderedErrors ]);
});

export default TextInput;