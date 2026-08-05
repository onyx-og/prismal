import { ReactNode, FC } from 'react';
import Icon from '../Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from '../../utils/colors';
import { setBorderRadius, setBoxElevation } from '../../utils';

/**
 * @typedef {object} ChipProps
 * @description Props for the Chip component.
 */
export interface ChipProps extends ComponentProps {
    /** The visual style/type of the chip. Defaults to 'default'. */
    type?: 'default' | 'primary' | 'text';
    /** The size of the chip. Defaults to 'sm'. */
    size?: 'sm' | 'md' | 'lg';
    /** Optional icon name to display inside the chip. */
    iconName?: string;
    /** The content of the chip. */
    children?: ReactNode;
    /** Optional text label to display. */
    label?: string;
}

/**
 * @component Chip
 * @description A customizable badge/chip component, stylized following the .component-badge design.
 * @param {ChipProps} props The component props.
 * @returns {React.ReactElement} The rendered Chip component.
 */
const Chip: FC<ChipProps> = (props) => {
    const {
        "data-id": dataId,
        iconName,
        children,
        label,
        type = 'default',
        size = 'sm',
        className,
        style,
        accent,
        accentDark,
        accentLight,
        elevation = 0,
        borderRadius,
        ...rest
    } = props;

    let chipClass = `prismal-chip chip-${type} chip-${size}`;
    if (className) chipClass = `${chipClass} ${className}`;
    if (elevation) chipClass = `${chipClass} chip-elevated`;

    let style_: { [key: string]: any } = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);
    style_ = { ...style_, ...style };

    return (
        <span
            data-id={dataId}
            style={style_}
            className={chipClass}
            {...rest}
        >
            {iconName && <Icon name={iconName} />}
            {children || label}
        </span>
    );
};

export default Chip;
export { Chip };
