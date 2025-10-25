import { ReactElement, JSX, CSSProperties, FC } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} FormProps
 * @description Props for the Form component.
 * @property {ReactElement | ReactElement[]} children The input elements to be included in the form.
 * @property {string} [name] The name of the form.
 * @property {JSX.Element} [submit] A custom submit button element.
 * @property {(formData: {[key:string]: any}) => void} [onSubmit] Callback function executed on form submission with valid data.
 * @property {object | CSSProperties["gridTemplate"]} [gridTemplate] Defines the grid layout for form fields.
 * @property {object | CSSProperties["gap"]} [gridGap="0.5rem"] Defines the gap between grid items.
 */
export interface FormProps extends ComponentProps {
    children: ReactElement | ReactElement[];
    name?: string;
    submit?: JSX.Element;
    onSubmit?: (formData: {
        [key: string]: any;
    }) => void;
    gridTemplate?: {
        cols?: CSSProperties["gridTemplateColumns"];
        rows?: CSSProperties["gridTemplateRows"];
    } | CSSProperties["gridTemplate"];
    gridGap?: {
        column?: CSSProperties["columnGap"];
        row?: CSSProperties["rowGap"];
    } | CSSProperties["gap"];
}
/**
 * @component Form
 * @description A form component that manages form state, validation, and submission.
 * @param {FormProps} props The component props.
 * @returns {React.ReactElement} The rendered Form component.
 * @example
 * <Form name="login" onSubmit={(data) => console.log(data)}>
 *   <TextInput name="username" label="Username" />
 *   <TextInput name="password" label="Password" type="password" />
 * </Form>
 */
declare const Form: FC<FormProps>;
export default Form;
