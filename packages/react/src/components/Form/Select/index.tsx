import {
    ReactNode, forwardRef, ForwardedRef,CSSProperties,
    useState, useEffect, useMemo, useCallback, useRef,
    useImperativeHandle, JSX
} from "react";
import { InputProps, InputRefType } from "../types";
import { setAccentStyle } from 'utils/colors';
import "./index.scss";
import { setBorderRadius } from "utils/";

/**
 * @typedef {object} SelectOption
 * @description Represents an option in the Select component.
 * @property {string} value The value of the option.
 * @property {ReactNode} element The renderable content of the option.
 * @property {boolean} [selected] If true, the option is selected by default.
 */
export interface SelectOption {
    value: string;
    element: ReactNode;
    selected?: boolean;
} 

/**
 * @typedef {object} SelectProps
 * @description Props for the Select component.
 * @property {boolean} [multiple=false] If true, allows multiple options to be selected.
 * @property {SelectOption[]} options The array of options to display.
 * @property {string | JSX.Element} [placeholder="Select.."] The placeholder text or element.
 * @property {((arg: string) => void) & ((arg: string[]) => void)} [onChange] Callback for when the selection changes.
 */
export interface SelectProps extends InputProps {
    multiple?: boolean;
    options: SelectOption[];
    placeholder?: string | JSX.Element;
    onChange?: ((arg: string) => void) & ((arg: string[]) => void);
    isFiltered?: boolean;
    /** Function to fetch options asynchronously based on filter */
    fetchOptions?: (filter?: string) => Promise<SelectOption[]>;
    /** Compare function for sorting options */
    orderOptions?: (a: SelectOption, b: SelectOption) => number;
}

/**
 * @component Select
 * @description A select input component for forms with single or multiple selection.
 * @param {SelectProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the select element.
 * @returns {React.ReactElement} The rendered Select component.
 * @example
 * <Select name="colors" label="Colors" options={[{ value: 'red', element: 'Red' }]} />
 */
const Select = forwardRef((props: SelectProps, ref: ForwardedRef<InputRefType>) => {
    const {
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
        id, name, title,
        label, placeholder = "Select..",
        required = false,
        disabled = false,
        multiple = false,
        onChange, validator,
        options, gridPlacement,
        fetchOptions, orderOptions
    } = props;

    const [selected, setSelected] = useState<string | string[]>();
    const [filter, setFilter] = useState("");
    const [availableOptions, setAvailableOptions] = useState<SelectOption[]>(options);

    useEffect( ()=> {
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
    },[options, multiple, placeholder]);

    /**
     * @function setSelection
     * @description Updates the selected state based on user interaction.
     * @param {string} value The value of the option to select or deselect.
     */
    const setSelection = useCallback( (value: string) => {
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

    /**
     * @member options_
     * @description Memoized array of option elements.
     * @returns {JSX.Element[]}
     */
    const options_ = useMemo(() => {
        let optionsSource = availableOptions;
        if (orderOptions) {
            optionsSource = [...optionsSource].sort(orderOptions);
        }
        let result = optionsSource.map((e, i) => {
            return <option key={i}
                value={e.value}
                onClick={() => setSelection(e.value)}
                // selected={selected?.includes(e.value)} // `selected` on <option> is not recommended
                >
                {e.element}
            </option>
        })
        return result;
    },[availableOptions, setSelection, orderOptions]);

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

    useEffect( () => {
        if ( selected && onChange ) {
            if (multiple){
                let selected_ = selected as string[]
                onChange(selected_);
            } else {
                let selected_ = selected as string;
                onChange(selected_);
            }
        };
    }, [selected, multiple, onChange]);

    const inputRef = useRef<HTMLSelectElement>(null);
    const [ isNotValid_, markNotValid ] = useState<(string | boolean)[]>([]);
    const isNotValid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    useEffect(() => {
        if (fetchOptions) {
            let isActive = true;
            fetchOptions(filter).then((fetchedOptions) => {
                if (isActive && fetchedOptions) setAvailableOptions(fetchedOptions);
            }).catch(() => {
                if (isActive) setAvailableOptions([]);
            });
            return () => {
                isActive = false;
            };
        }

        if (!isFiltered || !filter.trim()) {
            setAvailableOptions(options);
            return;
        }

        const normalizedFilter = filter.trim().toLowerCase();
        const filteredOptions = options.filter((option) => {
            const valueMatch = option.value.toLowerCase().includes(normalizedFilter);
            let elementMatch = false;
            if (typeof option.element === "string") {
                elementMatch = option.element.toLowerCase().includes(normalizedFilter);
            }
            return valueMatch || elementMatch;
        });
        setAvailableOptions(filteredOptions);
    }, [options, fetchOptions, filter, isFiltered]);

    /**
     * @function checkValidity
     * @description Checks the validity of the select input.
     * @returns {(string|boolean)[]} An array of error messages, or an empty array if valid.
     */
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
        name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => inputRef.current?.value,
        element: inputRef.current
    }), [name, checkValidity]);

    const className_ = useMemo(() => {
        let className_ = "prismal-input-select";
        if (className) className_ = `${className_} ${className}`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, isNotValid_]);

    const placeholder_ = useMemo(() => {
        if (isFiltered) {
            return <input type="text" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={typeof placeholder === "string" ? placeholder : undefined} />;
        }
        return placeholder;
    }, [filter, isFiltered, placeholder]);

    return <div className={className_} style={style_}>
        <label htmlFor={id}>{label}</label>
        <select name={name} ref={inputRef} id={id} title={title}
            multiple={multiple}
            required={required}
            disabled={disabled}
            value={selected}
            onChange={(e) => setSelected(multiple ? Array.from(e.target.selectedOptions, option => option.value) : e.target.value)}
        >
            <option value="">{placeholder_}</option>
            {options_}
        </select>
    </div>
});

export default Select;