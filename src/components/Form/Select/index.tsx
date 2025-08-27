import React from "react";
import { InputProps } from "components/Form/types";
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
const Select = (props: SelectProps) => {
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
        options
    } = props;

    const [selected, setSelected] = React.useState<string | string[]>();

    React.useEffect( ()=> {
        let selected_ = options
            .filter((i) => i.selected)
            .map((i) => i.value);
        if (multiple) {
            setSelected(selected_);
        } else if (selected_.length) {
            setSelected(selected_[0])
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

    let className_ = "prismal-input-select";
    if (className) className_ = `${className_} ${className}`;

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

    // [TODO] Render placeholder conditionally
    // if no placeholder is provided and no defaultSelected 
    // mark as selected the first option
    return <div className={className_} style={style_}>
        <label htmlFor={id}>{label}</label>
        <select id={id} title={title}
            multiple={multiple}
            required={required}
            disabled={disabled}
        >
            <option value="">{placeholder}</option>
            {options_}
        </select>
    </div>
}

export default Select;