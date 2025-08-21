import Dropdown from "components/Dropdown";
import "./index.scss";

export interface TooltipProps {
    children?: React.ReactNode; // content
    text: string;
}

const Tooltip = (props: TooltipProps) => {
    const { children,text } = props;

    return <Dropdown className={"prismal-tooltip"} toggleElement={children}>
        {text}
    </Dropdown>
}

export default Tooltip;