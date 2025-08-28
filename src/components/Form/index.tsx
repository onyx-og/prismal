import React from 'react';
import './index.scss';
import Button from '../Button';
import { InputRefType } from './types';
import ComponentProps from 'components/Component';
import { setAccentStyle } from "utils/";
import TextInput from './TextInput';
import Toggle from "./Toggle";
import Select from "./Select";

export interface FormProps extends ComponentProps {
    children: JSX.Element | JSX.Element[];
    name?: string;
    submit: JSX.Element;
    onSubmit?: ( formData: {[key:string]: any} ) => void;
}
const Form = ( props: FormProps ) => {
    const {
        children, 
        name, submit, onSubmit,
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark
    } = props;
    const inputsRef = React.useRef<(InputRefType)[]>([]);
    const [ isInvalid, markInvalid ] = React.useState(false);

    let className_ = "prismal-form";
    if (className) className_ = `${className_} ${className}`;

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    // [TODO] Consider changing into React.Children method
    // Assures that _children is an array, event when it's not
    const _children = ([] as JSX.Element[]).concat(children);

    // Clears inputs ref list when children changes
    React.useEffect( () => {
        inputsRef.current = inputsRef.current.slice(0, _children.length);
    }, [_children]);

    /* Callback ref that filters, accepting only references
     * having isInputRefType as property, or rather InputRefTypes
     */
    const addInputRef = (element: JSX.Element | InputRefType, i: number) => {
        if ( element && element.hasOwnProperty('isInputRefType') ) {
            return inputsRef.current[i] = element as InputRefType;
        }
    }

    /* Renders all given children, using callback ref to dinamically populate ref array
     * when the child is a managed input
     */
    const renderedChildren = React.useMemo( () => _children.map( (child, i) => {
        if ([TextInput, Select, Toggle].includes(child.type) || child.props.ref?.current?.isInputRefType) {
            console.log("Is input ref type?", child.props.ref?.current?.isInputRefType);
            return <child.type key={i} 
                ref={(el: JSX.Element | InputRefType) => addInputRef(el,i)}
            {...child.props} />
        }
        return child;
    }), [_children]);
    
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

        for ( const inputRef of inputsRef.current ) {

            // Checks field's validity and adds error, if present
            let inputValidity = inputRef.checkValidity();
            if ( inputValidity.length ) validity.push(inputValidity);

            // Append field's data to form's data
            if (inputRef.current?.name)
                formData[inputRef.current?.name] = inputRef.current?.value;
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
    
    const submitComponent = !submit ? <Button 
        type='primary' 
        className='form-submit' onClick={(e) => {e.stopPropagation(); submitForm(e)}}>
            Submit
    </Button> : <submit.type {...submit.props} onClick={(e: any) => {
        submit.props.onClick && submit.props.onClick();
        submitForm(e);
    }}/>

    return <form onSubmit={submitForm} data-id={dataId} className={className_} style={style_} name={name}>
        <div className='form-fields'>{renderedChildren}</div>
        { submitComponent }
        { isInvalid ? 
            <span className='form-error'>Check the fields for errors</span> : null
        }
    </form>
}

export default Form;