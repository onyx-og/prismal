/// <reference types="react" />
import 'styles/icons.scss';
/**
 * @typedef {object} IconProps
 * @description Props for the Icon component.
 * @property {string} name The name of the icon to display.
 * @property {string} [className] Additional CSS class for the icon element.
 */
export interface IconProps {
    name: string;
    className?: string;
}
/**
 * @component Icon
 * @description A component to display an icon from the icon font.
 * @param {IconProps} props The component props.
 * @returns {React.ReactElement} The rendered Icon component.
 * @example
 * <Icon name="check" />
 */
declare const Icon: React.FC<IconProps>;
export default Icon;
