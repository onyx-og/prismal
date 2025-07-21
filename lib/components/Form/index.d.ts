/// <reference types="react" />
import './index.scss';
interface FormProps {
    children: JSX.Element | JSX.Element[];
    name?: string;
    submit: JSX.Element;
    onSubmit?: (formData: {
        [key: string]: any;
    }) => void;
}
declare const Form: (props: FormProps) => import("react/jsx-runtime").JSX.Element;
export default Form;
