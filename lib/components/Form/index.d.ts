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
    gridTemplate?: {
        cols?: React.CSSProperties["gridTemplateColumns"];
        rows?: React.CSSProperties["gridTemplateRows"];
    } | React.CSSProperties["gridTemplate"];
    gridGap?: {
        column?: React.CSSProperties["columnGap"];
        row?: React.CSSProperties["rowGap"];
    } | React.CSSProperties["gap"];
}
declare const Form: React.FC<FormProps>;
export default Form;
