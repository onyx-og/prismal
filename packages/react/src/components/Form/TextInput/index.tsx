import { 
    forwardRef, ForwardedRef, useImperativeHandle, 
    useState, useMemo, useCallback, useRef,
    useEffect, ReactNode,KeyboardEvent, CSSProperties
} from 'react';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { Accepted, InputProps, InputRefType, InputType } from '../types';
import { setBorderRadius } from 'utils/';

/**
 * @typedef {object} TextInputProps
 * @description Props for the TextInput component.
 * @property {T} [htmlType='text'] The type of the input element.
 * @property {Accepted<T>} [accept] The accept attribute for file inputs.
 * @property {(arg?: string | null) => void} [onPressEnter] Callback for when the Enter key is pressed.
 * @property {(arg?: string | string[]) => void} [onChange] Callback for when the input value changes.
 * @property {'s' | 'm' | 'l'} [size='m'] The size of the input.
 * @property {ReactNode} [after] Element to display after the input.
 * @property {ReactNode} [before] Element to display before the input.
 * @property {'default' | 'primary'} [type='default'] The visual style of the input.
 * @property {string} [placeholder] Placeholder text for the input.
 */
export interface TextInputProps<T extends InputType> extends InputProps {
    htmlType?: T;
    accept?: Accepted<T>;
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string | string[] | File | File[] | undefined) => void;
    size?: 's' | 'm' | 'l';
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    placeholder?: string;
    multiple?: boolean;
}

/**
 * @component TextInput
 * @description A versatile text input component with validation, custom styling, and support for various input types.
 * @param {TextInputProps<InputType>} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered TextInput component.
 * @example
 * <TextInput label="Name" name="name" placeholder="Enter your name" />
 */
const TextInput = forwardRef( ( props: TextInputProps<InputType>, ref: ForwardedRef<InputRefType> ) => {
    const { 
        name, id,
        size = 'm',
        htmlType = 'text',
        onChange,
        onPressEnter,
        validator, accept,
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
        type = 'default', gridPlacement,
        multiple = false
    } = props;
    
    const inputRef = useRef<HTMLInputElement>(null);

    const [ isInvalid_, markInvalid ] = useState<(string | boolean)[]>([]);
    const isInvalid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isInvalid.current = isInvalid_;
    }, [isInvalid_]);
    
    /**
     * @function checkValidity
     * @description Checks the validity of the input based on the validator and required props.
     * @returns {(string | boolean)[]} An array of error messages, or an empty array if valid.
     */
    const checkValidity = useCallback( () => {
        const value = inputRef?.current?.value;
        let errorMessages = [];
        // If provided, perform validator method
        if (validator) {
            let result = validator(value!);
            // When the validator returns true or message
            // is invalid
            if ( typeof result == "string" || result == false) errorMessages.push(result);
        }
        // When field is required and is missing value, add the error
        if (required && !value && htmlType !== 'file') errorMessages.push('This field is mandatory');
        markInvalid(errorMessages);
        return errorMessages;
    }, [validator, required, htmlType]);


    /* Adds new properties to the returned ref:
     * a method to know whether the component is valid or not.
     * a method to trigger the field validation
     */
    useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name: name,
        checkValidity,
        getValidity: () => isInvalid.current,
        getValue: () => {
            if (htmlType === 'file') {
                return multiple && inputRef.current?.files ? Array.from(inputRef.current.files) : inputRef.current?.files?.[0];
            }
            return inputRef.current?.value
        },
        element: inputRef.current
    }), [name, checkValidity, htmlType, multiple]);

    let className_ = useMemo(() => {
        let className_ = 'prismal-input-text';

        if (className) className_ = `${className_} ${className}`;
        if ( required ) className_ = `${className_} input-required`;
        className_ = `${className_} size-${size}`;
        if ( isInvalid_.length ) className_ = `${className_} input-invalid`;
        if ( inline ) className_ = `${className_} inline`;

        return className_
    }, [className, required, isInvalid_, inline, size]);

    let inputClass = "prismal-input";
    inputClass = `${inputClass} prismal-input-${type}`;

    /**
     * @function onValueChange
     * @description Handles the input's change event, triggers validation, and calls the onChange prop.
     */
    const onValueChange = useCallback( () => {
        if (!disabled) {
            // FIX: Convert FileList to File[] for multiple file inputs to match onChange type.
            const value = htmlType === 'file'
                ? (multiple && inputRef.current?.files ? Array.from(inputRef.current.files) : inputRef.current?.files?.[0])
                : inputRef?.current?.value;
            onChange && onChange(value);
            checkValidity();
        }
    }, [onChange, disabled, checkValidity, htmlType, multiple]);

    /**
     * @function onKeyUp
     * @description Handles the key up event, specifically for the Enter key.
     * @param {KeyboardEvent<HTMLInputElement>} e The keyboard event.
     */
    const onKeyUp = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) {
            // avoid
        } else if ( e.key == 'Enter' && onPressEnter) {
            const value = inputRef?.current?.value;
            onPressEnter(value);
        }
    }, [onPressEnter, disabled])

    /** 
     * @member renderedErrors
     * @description Transforms 'isNotvalid' array of errors into a list of error messages.
     * @returns {JSX.Element[]}
     */
    const renderedErrors = useMemo( () => isInvalid_.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isInvalid_]);

    let style_: CSSProperties = {...style};
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
                accept={accept}
                placeholder={placeholder}
                defaultValue={value as string}
                multiple={multiple}
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
TextInput.displayName = "TextInput";
export default TextInput;