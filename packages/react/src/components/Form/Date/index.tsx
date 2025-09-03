import React from "react";
import { InputProps } from "components/Form/types";
import { setAccentStyle, setBorderRadius } from "utils/";
import "./index.scss";

export interface DateProps extends InputProps {

}
const Date = (props: DateProps) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
        onChange,
        id, name,
        placeholder, label,
        labelClass, labelPosition, labelSeparator,
        value,
        validator
    } = props;

    let className_ = "prismal-input-date";
    if (className) className_ = `${className_} ${className}`;

    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    if (style) style_ = {...style_, ...style};
    
    const label_ = React.useMemo(() => {
        return label;
    },[label, labelClass, labelPosition, labelSeparator]);

    return <div style={style_} className={className_}>
        {label_}
        <input id={id} name={name} type="date"/>
    </div>
}

export default Date;