import React from 'react';
import ComponentProps from '../../Component';
import { setAccentStyle } from 'utils/colors';
import './index.scss';
    
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
}
export interface SelectProps extends ComponentProps {
    options: SelectOption[];
    name: string;
    label?: string;
    placeholder?: string | JSX.Element;
    onChange?: ( arg: SelectOption ) => void;
}
const Select: React.FC<SelectProps> = ( props ) => {
    const {
        options,
        name,
        label,
        placeholder,
        onChange,
        className,
        accent, accentLight, accentDark
    } = props;
    const [ selected, setSelected ] = React.useState<SelectOption | undefined>(
        undefined
    );
    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const doSelection = React.useCallback( (el: {
        label: string;
        value: string;
        selected?: boolean;
    }) => {
        console.log("prismal-design: doSelection", {el, selected: selectRef.current?.value});
        // Update hidden input (mirror)
        if (
            selectRef.current &&
            selectRef.current.value !== el.value
        ) {
            selectRef.current.value = el.value;
            // Update surface component
            el.selected = true;
            console.log("doSelection: setting selection to", el);
            setSelected(el);
        };
        // Remove focus from surface component
        dropdownRef.current?.blur();
    }, [selectRef]);

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});

    let selectClass = 'prismal-select';
    if (className) selectClass = `${selectClass} ${className}`;

    React.useEffect( () => {
        if ( selected && onChange ) {
            console.log("triggering onChange for selection:", selected);
            onChange(selected)
        };
    }, [selected, dropdownRef]);

    const selector = React.useMemo(() => {
        if (placeholder != null && typeof placeholder !== "string" ) {
            return <div className="prismal-select-selector">{placeholder}</div>;
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
        
}

export default Select;
