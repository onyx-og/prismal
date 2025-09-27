import { ReactElement, JSX, CSSProperties, FC } from 'react';
import './index.scss';
import ComponentProps from '../Component';
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
declare const Form: FC<FormProps>;
export default Form;
