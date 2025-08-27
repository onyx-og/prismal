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
const Toggle = (props: ToggleProps): ReactElement => {
    const {
        type = "checkbox",
        id, name, checked = false,
        disabled = false, required,
        labelPosition = "after",
        label, labelSeparator, labelClass,
        style, accent, accentLight, accentDark,
        borderRadius = "small", onChange
    } = props;

    const { className } = props;
    let className_ = "prismal-toggle";
    if (className) className_ = `${className_} ${className}`;

    let style_: {[key: string]: any} = {...style};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    const [checked_, setChecked] = React.useState<boolean>(false);

    // Propagate checked prop change to internal state
    React.useEffect(() => {
        setChecked(checked)
    }, [checked]);

    // Trigger onChange method whenever checked state changes
    React.useEffect(() => {
        onChange && onChange(checked_);
    },[checked_]);

    const toggleInput = React.useCallback(() => {
        setChecked(!checked_);
    }, [setChecked, checked_]);

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

        return <input onChange={toggleInput}
            name={name} id={id} type="checkbox" checked={checked_}
            disabled={disabled} required={required}
            className={inputClass_} readOnly={false}
        />
    }, [disabled, required, id, name, toggleInput, checked_, type]);


    return <div style={style_} className={className_}>
        {labelPosition == "after" ? <>{input}{label_}</>
            : <>{label_}{input}</>
        }
    </div>
}

export default Toggle;