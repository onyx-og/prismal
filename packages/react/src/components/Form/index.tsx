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

    // [DEPRECATED] Clears inputs ref list when children changes
    // Because ref is populated with .push
    // useEffect( () => {
    //     inputsRef.current = inputsRef.current.slice(0, _children.length);
    // }, [_children]);

    /* Callback ref that filters, accepting only references
     * having isInputRefType as property, or rather InputRefTypes
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
        return Children.toArray(_children).map( (child, i) => {
            if (isValidElement(child)) {
                const child_ = child as ElementWithRef<InputRefType>;
                return cloneElement(child_, {
                    ref: (el: InputRefType | null) => addInputRef(el)
                });
            } 
        });
    }, [_children, name]);
    
    const submitForm = (e?: any) => {
        // i.e. provided with a <button> avoid default behaviour (post)
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
           
        let validity = [],
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
    
    const submitComponent = useMemo( () => {
        if (submit) {
            return cloneElement(submit, {
                onClick: (e: any) => {
                    submit.props.onClick && submit.props.onClick();
                    submitForm(e);
                }
            });
            // return <submit.type {...submit.props} onClick={(e: any) => {
            //     submit.props.onClick && submit.props.onClick();
            //     submitForm(e);
            // }}/>
        } else if (onSubmit) {
            return <Button 
                type='primary' 
                className='form-submit' onClick={(e) => {e.stopPropagation(); submitForm(e)}}>
                    Submit
            </Button>
        } else {
            // No onSubmit method, no submit button
        }
    }, [submit, submitForm, onSubmit]);

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
    }, [renderedChildren, gridTemplate]);

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