import { ReactNode, FC } from 'react';
import ComponentProps from '../Component';
import './index.scss';
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
declare const Chip: FC<ChipProps>;
export default Chip;
export { Chip };
