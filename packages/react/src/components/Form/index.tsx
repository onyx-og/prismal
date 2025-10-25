import {
    ReactElement, RefAttributes, JSX, CSSProperties,
    FC, useRef, useState, useImperativeHandle, useMemo, Children, isValidElement,
    cloneElement
} from 'react';
import './index.scss';
import Button from '../Button';
import { InputRefType } from './types';
import ComponentProps from '../Component';
import { setAccentStyle } from "utils/";

interface ElementWithRef<T> extends JSX.Element {
    ref: RefAttributes<T>
}

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
    onSubmit?: ( formData: {[key:string]: any} ) => void;
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
const Form: FC<FormProps> = (props) => {
    const {
        children, 
        name, submit, onSubmit,
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        gridTemplate, gridGap = "0.5rem"
    } = props;
    const inputsRef = useRef<{[key: string]: InputRefType}>({});
    const [ isInvalid, markInvalid ] = useState(false);

    let className_ = "prismal-form";
    if (className) className_ = `${className_} ${className}`;

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    // [TODO] Consider changing into Children method
    // Assures that _children is an array, event when it's not
    const _children = useMemo(()=> ([] as JSX.Element[]).concat(children), [children]);

    /**
     * @function addInputRef
     * @description A callback ref to collect references to form inputs.
     * @param {InputRefType | null} inputRef The ref object of the input.
     */
    const addInputRef = (inputRef: InputRefType | null) => {
        if ( inputRef && inputRef.hasOwnProperty('isInputRefType') && inputRef.isInputRefType) {
            if (inputRef.name) inputsRef.current[inputRef.name] = inputRef;
        } else {
            console.warn(`Form ${name ? name.concat(' ') : ''}has child node that may not be managed.`);
        }
    }

    /* Renders all given children, using callback ref to dinamically populate ref array
     * when the child is a managed input
     */
    const renderedChildren = useMemo( () => {
        return Children.toArray(_children).map( (child) => {
            if (isValidElement(child)) {
                const child_ = child as ElementWithRef<InputRefType>;
                return cloneElement(child_, {
                    ref: (el: InputRefType | null) => addInputRef(el)
                });
            } 
            return child;
        });
    }, [_children, name]);
    
    /**
     * @function submitForm
     * @description Validates all form inputs and calls the onSubmit callback if the form is valid.
     * @param {any} [e] The event object, used to prevent default form submission.
     */
    const submitForm = (e?: any) => {
        // i.e. provided with a <button> avoid default behaviour (post)
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
           
        let validity: (string|boolean)[][] = [],
            /* formData is an object with field's mapped to their values
             */
            formData: {
                [fieldName: string]: string | undefined
            } = {};

        for ( const [name, inputRef] of Object.entries(inputsRef.current) ) {
            // Checks field's validity and adds error, if present
            let inputValidity = inputRef.checkValidity();
            if ( inputValidity.length ) validity.push(inputValidity);

            // Append field's data to form's data
            if (name) {
                formData[name] = inputRef.getValue();
            }
        }

        // Marks the form as invalid when there is at least one field error
        if ( validity.length ) {
            markInvalid(true);
        } else {
            markInvalid(false);
            // When provided, executes callback 'onSubmit' with form's data
            onSubmit && onSubmit(formData)
        }
    }
    
    /**
     * @member submitComponent
     * @description Memoized submit button element.
     * @returns {JSX.Element | undefined}
     */
    const submitComponent = useMemo( () => {
        if (submit) {
            return cloneElement(submit, {
                onClick: (e: any) => {
                    submit.props.onClick && submit.props.onClick();
                    submitForm(e);
                }
            });
        } else if (onSubmit) {
            return <Button 
                type='primary' 
                className='form-submit' onClick={(e) => {e.stopPropagation(); submitForm(e)}}>
                    Submit
            </Button>
        } else {
            return undefined;
        }
    }, [submit, onSubmit]);

    /**
     * @member formFields
     * @description Memoized container for form fields with grid styling.
     * @returns {JSX.Element}
     */
    const formFields = useMemo(() => {
        const style: CSSProperties = {};

        if (typeof gridTemplate == "object") {
            style.gridTemplateColumns = gridTemplate.cols;
            style.gridTemplateRows = gridTemplate.rows;
        } else if (typeof gridTemplate == "string") {
            style.gridTemplate = gridTemplate;
        }

        if (typeof gridGap == "object") {
            style.columnGap = gridGap.column;
            style.rowGap = gridGap.row;
        } else if (typeof gridGap == "string") {
            style.gap = gridGap;
        }

        return <div style={style} className='form-fields'>
            {renderedChildren}
        </div>
    }, [renderedChildren, gridTemplate, gridGap]);

    return <form data-id={dataId} name={name} 
        onSubmit={submitForm}
        className={className_} style={style_}
    >
        { formFields }
        { submitComponent }
        { isInvalid ? 
            <span className='form-error'>Check the fields for errors</span> : null
        }
    </form>
}

export default Form;