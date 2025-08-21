import Dropdown from "components/Dropdown";
import "./index.scss";
import ComponentProps from "components/Component";
import { setBorderRadius } from 'utils/';

export interface TooltipProps extends ComponentProps {
    children?: React.ReactNode; // content
    text: string;
    accent?: never;
    accentDark?: never;
    accentLight?: never;
}

const Tooltip = (props: TooltipProps) => {
    const {
        children,text,
        className, style,
        borderRadius
    } = props;

    let style_: {[key: string]: any} = {};
    setBorderRadius(style_, borderRadius);

    if (style) style_ = {...style_, style};

    let className_ = 'prismal-tooltip';
    if (className) className_ = `${className_} ${className}`;

    return <Dropdown style={style_} className={className_} toggleElement={children}>
        {text}
    </Dropdown>
}

export default Tooltip;