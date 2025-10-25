import { InputProps } from "components/Form/types";
import "./index.scss";
/**
 * @typedef {object} DateProps
 * @description Props for the Date input component.
 */
export interface DateProps extends InputProps {
}
/**
 * @component DateComponent
 * @description A date input component for forms.
 * @param {DateProps} props The component props.
 * @returns {React.ReactElement} The rendered Date input component.
 * @example
 * <Date label="Select a date" name="event-date" />
 */
declare const DateComponent: (props: DateProps) => import("react/jsx-runtime").JSX.Element;
export default DateComponent;
