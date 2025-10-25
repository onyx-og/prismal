import {
    useMemo
} from "react";
import { InputProps } from "components/Form/types";
import { setAccentStyle, setBorderRadius } from "utils/";
import "./index.scss";

/**
 * @typedef {object} DateProps
 * @description Props for the Date input component.
 */
export interface DateProps extends InputProps {}

/**
 * @component DateComponent
 * @description A date input component for forms.
 * @param {DateProps} props The component props.
 * @returns {React.ReactElement} The rendered Date input component.
 * @example
 * <Date label="Select a date" name="event-date" />
 */
// FIX: Renamed component from `Date` to `DateComponent` to avoid conflict with the native `Date` object.
const DateComponent = (props: DateProps) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
        onChange,
        id, name,
        label,
        labelClass, labelPosition, labelSeparator
    } = props;

    let className_ = "prismal-input-date";
    if (className) className_ = `${className_} ${className}`;

    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    if (style) style_ = {...style_, ...style};
    
    const label_ = useMemo(() => {
        return label;
    },[label, labelClass, labelPosition, labelSeparator]);

    return <div style={style_} className={className_} data-id={dataId}>
        {label_}
        <input id={id} name={name} type="date" onChange={onChange}/>
    </div>
}

export default DateComponent;