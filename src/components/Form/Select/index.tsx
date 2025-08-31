import React from "react";
import { InputProps, InputRefType } from "components/Form/types";
import { setAccentStyle } from 'utils/colors';
import "./index.scss";
import { setBorderRadius } from "utils/";

export interface SelectOption {
    value: string;
    element: React.ReactNode;
    selected?: boolean;
} 
export interface SelectProps extends InputProps {
    multiple?: boolean;
    options: SelectOption[];
    placeholder?: string | JSX.Element;
    onChange?: ((arg: string) => void) & ((arg: string[]) => void);
}
const Select = React.forwardRef((props: SelectProps, ref: React.ForwardedRef<InputRefType>) => {
    const {
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
        id, name, title,
        label, placeholder = "Select..",
        required = false,
        disabled = false,
        multiple = false,
        readOnly = false,
        onChange, validator,
        options
    } = props;

    const [selected, setSelected] = React.useState<string | string[]>();

    React.useEffect( ()=> {
        let selected_ = options
            .filter((i) => i.selected)
            .map((i) => i.value);
        if (multiple) {
            // If multiple enabled
            // all selections are good
            setSelected(selected_);
        } else if (selected_.length) {
            // If not in multiple mode
            // take the first selection
            setSelected(selected_[0])
        } else if (!placeholder) {
            // If no initial selection
            // and no placeholder, set the first option as selected
            setSelected(options[0].value)
        }
    },[options, multiple]);

    const setSelection = React.useCallback( (value: string) => {
        if (!multiple) setSelected(value);
        else if (typeof selected == "object" && selected.includes(value)) {
            let selection = [...selected];
            selection = [
                ...selection.slice(0, selected.indexOf(value)),
                ...selection.slice(selected.indexOf(value)+1, selection.length)
            ];
            setSelected(selection)
        } else if (typeof selected == "object") {
            let selection = [...selected];
            selection.push(value);
            setSelected(selection);
        }
    },[selected, multiple])

    const options_ = React.useMemo(() => {
        return options.map((e, i) => {
            return <option key={i}
                value={e.value}
                onClick={() => setSelection(e.value)}
                selected={selected?.includes(e.value)}>
                {e.element}
            </option>
        })
    },[options, selected]);

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    if (style) style_ = {...style_, style};

    React.useEffect( () => {
        if ( selected && onChange ) {
            if (multiple){
                let selected_ = selected as string[]
                onChange(selected_);
            } else {
                let selected_ = selected as string;
                onChange(selected_);
            }
        };
    }, [selected, multiple]);

    const inputRef = React.useRef<HTMLSelectElement>(null);
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
    }, [inputRef.current, validator, required]);
    
    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => inputRef.current?.value,
        element: inputRef.current
    }), [name]);

    const className_ = React.useMemo(() => {
        let className_ = "prismal-input-select";
        if (className) className_ = `${className_} ${className}`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, isNotValid_]);

    return <div className={className_} style={style_}>
        <label htmlFor={id}>{label}</label>
        <select name={name} ref={inputRef} id={id} title={title}
            multiple={multiple}
            required={required}
            disabled={disabled}
        >
            <option value="">{placeholder}</option>
            {options_}
        </select>
    </div>
});

export default Select;