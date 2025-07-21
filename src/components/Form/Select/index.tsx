import React from 'react';
import { setAccentStyle } from 'utils/colors';
import './index.scss';

import { InputProps, InputRefType } from '../types';

export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
}
export interface SelectProps extends InputProps {
    options: SelectOption[];
    name: string;
    label?: string;
    placeholder?: string;
    onChange?: ( arg: SelectOption ) => void;
}
const Select = React.forwardRef( ( props: SelectProps, ref: React.ForwardedRef<InputRefType> ) => {
    const {
        options,
        name,
        label,
        placeholder,
        onChange, validator, required,
        className,
        accent, accentLight, accentDark
    } = props;
    const [ selected, setSelected ] = React.useState<SelectOption | undefined>(
        options.find(i => i.selected)
    );
    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    const [ isInvalid, markInvalid ] = React.useState<(string | boolean)[]>([]);

    const checkValidity = React.useCallback( () => {
        const value = selectRef?.current?.value;
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

    /* Adds new properties to the returned ref:
     * a method to know whether the component is valid or not.
     * a method to trigger the field validation
     */
    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        checkValidity,
        getValidity: () => isInvalid,
        current: selectRef.current
    }), [isInvalid]);

    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const selectedOpt = options.find((option) => option.selected );
        if (selectedOpt) setSelected(selectedOpt);
    },[options]);

    const doSelection = React.useCallback( (el: {
        label: string;
        value: string;
        selected?: boolean;
    }) => {
        // console.log("alenite-design: doSelection", {el, selected: selectRef.current?.value});
        // Update hidden input (mirror)
        if (
            selectRef.current &&
            selectRef.current.value !== el.value
        ) {
            selectRef.current.value = el.value;
            // Update surface component
            el.selected = true;
            // console.log("doSelection: setting selection to", el);
            setSelected(el);
        };
        // Remove focus from surface component
        dropdownRef.current?.blur();
    }, []);

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});

    let selectClass = 'alenite-select';
    if (className) selectClass = `${selectClass} ${className}`;

    React.useEffect( () => {
        if ( selected && onChange ) {
            console.log("triggering onChange for selection:", selected);
            onChange(selected)
        };
    }, [selected, dropdownRef]);

    const selector = React.useMemo(() => {
        if (placeholder != null && typeof placeholder !== "string" ) {
            return <div className="alenite-select-selector">{placeholder}</div>;
        } else return <span>{ selected?.label || placeholder || 'Select...'}</span>
    }, [placeholder, selected?.label])

    return <div 
        className={selectClass}
        style={style}
    >
        { label && <label className='dropdown-label' htmlFor={name}>{label}</label>}
        <div tabIndex={0} className='dropdown-select anim-pulse' ref={dropdownRef}>
            {selector}
            <div className='button'></div>
            <ul>
                {options.map( (el, i) => <li 
                    key={i}
                    onClick={(e) => {doSelection(el)}}
                >
                    {el.label}
                </li>)}
            </ul>
        </div>
        
        <select
            ref={selectRef}
            name={name}
            defaultValue={selected?.value || "__placeholder"}
        >   
            <option key={"__placeholder"} value={"__placeholder"}></option>
            {options.map( (el, i) => <option 
                key={i}
                value={el.value}
            >
                    {el.label}
            </option>)}
        </select>
    </div>
        
});

export default Select;
