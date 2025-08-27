/// <reference types="react" />
import './index.scss';
import ComponentProps from 'components/Component';
export interface FormProps extends ComponentProps {
    children: JSX.Element | JSX.Element[];
    name?: string;
    submit: JSX.Element;
    onSubmit?: (formData: {
        [key: string]: any;
    }) => void;
}
declare const Form: (props: FormProps) => import("react/jsx-runtime").JSX.Element;
export default Form;
