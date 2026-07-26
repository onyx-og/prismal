import { ReactElement, JSX, CSSProperties, FC } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} FormProps
 * @description Props for the Form component.
 */
export interface FormProps extends ComponentProps {
    /** The input elements to be included in the form. */
    children: ReactElement | ReactElement[];
    /** The name of the form. */
    name?: string;
    /** A custom submit button element. */
    submit?: JSX.Element;
    /** Callback function executed on form submission with valid data. */
    onSubmit?: (formData: {
        [key: string]: any;
    }) => void;
    /** Defines the grid layout for form fields. */
    gridTemplate?: {
        cols?: CSSProperties["gridTemplateColumns"];
        rows?: CSSProperties["gridTemplateRows"];
    } | CSSProperties["gridTemplate"];
    /** Defines the gap between grid items. */
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
