import React from 'react';
import './index.scss';
import ComponentProps from '../Component';
export interface FormProps extends ComponentProps {
    children: JSX.Element | JSX.Element[];
    name?: string;
    submit: JSX.Element;
    onSubmit?: (formData: {
        [key: string]: any;
    }) => void;
}
declare const Form: React.FC<FormProps>;
export default Form;
