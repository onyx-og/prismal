import {
    CSSProperties, ReactNode, ChangeEvent,
    forwardRef, ForwardedRef, useImperativeHandle,
    useState, useEffect, useCallback, useMemo, useRef
} from "react";
import { InputProps, InputRefType } from "../types";
import { setBorderRadius, setAccentStyle, setBoxElevation } from "utils/";
import "./index.scss";

/**
 * @typedef {object} TextareaProps
 * @description Props for the Textarea component.
 */
export interface TextareaProps extends InputProps {
    /** The number of visible text lines. */
    rows?: number;
    /** The visible width, in average character widths. */
    cols?: number;
    /** The maximum number of characters allowed. */
    maxLength?: number;
    /** If true, shows a live character counter (paired with `maxLength` when set). Defaults to false. */
    showLength?: boolean;
    /** Controls whether/how the textarea can be resized by the user. */
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
    /** If true, the textarea automatically grows its height to fit its content. Defaults to true. */
    autogrow?: boolean;
    /** The visual style of the input. */
    type?: 'default' | 'primary';
    /** Placeholder text for the textarea. */
    placeholder?: string;
    /** Content rendered above the textarea. */
    header?: ReactNode;
    /** Additional CSS class for the header. */
    headerClass?: string;
    /** Content rendered below the textarea. */
    footer?: ReactNode;
    /** Additional CSS class for the footer. */
    footerClass?: string;
    /** The legend content. When provided, the component renders as a `<fieldset>`. */
    legend?: ReactNode;
    /** Callback for when the textarea value changes. */
    onChange?: (arg?: string) => void;
}

/**
 * @component Textarea
 * @description A multi-line text input component for forms, with optional header, footer, and legend sections.
 * Grows automatically to fit its content unless `autogrow` is set to false.
 * @param {TextareaProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the textarea element.
 * @returns {React.ReactElement} The rendered Textarea component.
 * @example
 * <Textarea label="Bio" name="bio" rows={4} legend="About you" />
 */
const Textarea = forwardRef((props: TextareaProps, ref: ForwardedRef<InputRefType>) => {
    const {
        "data-id": dataId,
        id, name,
        rows, cols, maxLength,
        showLength = false,
        resize,
        autogrow = true,
        onChange, validator,
        required = false,
        readOnly = false,
        disabled = false,
        inline = false,
        type = "default",
        label, labelPosition = "before",
        labelSeparator = ":",
        labelClass,
        header, headerClass,
        footer, footerClass,
        legend,
        placeholder,
        value,
        className, style,
        accent, accentDark, accentLight,
        borderRadius, elevation = 0, gridPlacement
    } = props;

    let style_: CSSProperties = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);

    if (style) style_ = { ...style_, ...style };

    if (gridPlacement) {
        if (typeof gridPlacement == "string") {
            style_["gridArea"] = gridPlacement;
        } else if (typeof gridPlacement == "object") {
            if (gridPlacement.column) style_["gridColumn"] = gridPlacement.column;
            if (gridPlacement.row) style_["gridRow"] = gridPlacement.row;
        }
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /**
     * @function resizeToFit
     * @description Grows the textarea's height to fit its content, when `autogrow` is enabled.
     */
    const resizeToFit = useCallback(() => {
        const el = textareaRef.current;
        if (!el || !autogrow) return;
        // Collapse first so `scrollHeight` reflects the content's actual height
        // (including when text was removed), not the previously grown height.
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [autogrow]);

    // Sizes the textarea to its initial content on mount, and whenever autogrow
    // is toggled on.
    useEffect(() => {
        resizeToFit();
    }, [resizeToFit]);

    // Tracks the current character count for the `showLength` counter. Only read when
    // `showLength` is on, but kept in sync unconditionally so toggling it on later is accurate.
    const [length, setLength] = useState(() => (value as string)?.length ?? 0);

    const [isNotValid_, markNotValid] = useState<(string | boolean)[]>([]);
    const isNotValid = useRef<(string | boolean)[]>([]);

    useEffect(() => {
        isNotValid.current = isNotValid_;
    }, [isNotValid_]);

    /**
     * @function checkValidity
     * @description Checks the validity of the textarea based on the validator and required props.
     * @returns {(string | boolean)[]} An array of error messages, or an empty array if valid.
     */
    const checkValidity = useCallback(() => {
        const value = textareaRef?.current?.value;
        let errorMessages = [];

        if (required && !value) errorMessages.push('This field is mandatory');
        // If provided, perform validator method
        if (validator) {
            let result = validator(value!);
            // When the validator returns a message or false
            // is invalid
            if (result) errorMessages.push(result);
        }
        markNotValid(errorMessages);
        return errorMessages;
    }, [validator, required]);

    useImperativeHandle(ref, () => ({
        isInputRefType: true,
        name: name,
        checkValidity,
        getValidity: () => isNotValid.current,
        getValue: () => textareaRef.current?.value,
        element: textareaRef.current
    }), [name, checkValidity]);

    const className_ = useMemo(() => {
        let className_ = "prismal-input-textarea";
        if (className) className_ = `${className_} ${className}`;
        if (inline) className_ = `${className_} inline`;
        if (required) className_ = `${className_} input-required`;
        if (isNotValid_.length) className_ = `${className_} prismal-input-not-valid`;
        return className_;
    }, [className, inline, required, isNotValid_]);

    /**
     * @function doOnChange
     * @description Handles the textarea's change event, triggers validation, and calls the onChange prop.
     * @param {ChangeEvent<HTMLTextAreaElement>} event The change event.
     */
    const doOnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        if (disabled) return;
        const evtValue = event.currentTarget.value;
        setLength(evtValue.length);
        resizeToFit();
        checkValidity();
        onChange && onChange(evtValue);
    }, [onChange, disabled, checkValidity, resizeToFit]);

    /**
     * @member label_
     * @description Memoized label element for the textarea.
     * @returns {JSX.Element | null}
     */
    const label_ = useMemo(() => {
        if (label) {
            let labelClass_ = "prismal-input-textarea-label";
            if (labelClass) labelClass_ = `${labelClass_} ${labelClass}`;
            if (labelPosition == "before") {
                return <label htmlFor={id} className={labelClass_}>{label}{labelSeparator}</label>
            }
            return <label htmlFor={id} className={labelClass_}>{labelSeparator}{label}</label>
        }
        return null;
    }, [id, label, labelClass, labelSeparator, labelPosition]);

    /**
     * @member header_
     * @description Memoized header element, rendered inside the input box, above the textarea.
     * @returns {JSX.Element | null}
     */
    const header_ = useMemo(() => {
        if (!header) return null;
        let headerClass_ = "prismal-input-textarea-header";
        if (headerClass) headerClass_ = `${headerClass_} ${headerClass}`;
        return <div className={headerClass_}>{header}</div>;
    }, [header, headerClass]);

    /**
     * @member counter_
     * @description Memoized character counter, shown when `showLength` is enabled.
     * @returns {JSX.Element | null}
     */
    const counter_ = useMemo(() => {
        if (!showLength) return null;
        let counterClass = "prismal-input-textarea-counter";
        if (maxLength != null && length >= maxLength) counterClass = `${counterClass} at-limit`;
        return <span className={counterClass}>
            {maxLength != null ? `${length}/${maxLength}` : length}
        </span>;
    }, [showLength, length, maxLength]);

    /**
     * @member footer_
     * @description Memoized footer element, rendered inside the input box, below the textarea.
     * Combines the `footer` prop's content with the `showLength` counter, when either is present.
     * @returns {JSX.Element | null}
     */
    const footer_ = useMemo(() => {
        if (!footer && !counter_) return null;
        let footerClass_ = "prismal-input-textarea-footer";
        if (footerClass) footerClass_ = `${footerClass_} ${footerClass}`;
        return <div className={footerClass_}>
            {footer}
            {counter_}
        </div>;
    }, [footer, footerClass, counter_]);

    let inputClass = "prismal-input";
    inputClass = `${inputClass} prismal-input-${type}`;
    // When a header/footer is present, the border moves from the textarea to the
    // container that holds header + textarea + footer, so the whole group reads as
    // a single element rather than a boxed textarea with separate sections around it.
    if (header || footer_) inputClass = `${inputClass} prismal-input-has-sections`;

    // Autogrow drives the height via JS, so the drag handle is dropped unless the
    // caller explicitly asks for one.
    const resize_ = resize ?? (autogrow ? 'none' : undefined);
    const textareaClass = autogrow ? "prismal-textarea-autogrow" : undefined;

    /**
     * @member renderedErrors
     * @description Transforms 'isNotValid_' array of errors into a list of error messages.
     * @returns {JSX.Element[]}
     */
    const renderedErrors = useMemo(() => isNotValid_.map((err, i) =>
        <li key={i}>{typeof err === 'string' ? err : 'Check this field'}</li>
    ), [isNotValid_]);

    // Renders as a <fieldset> when a legend is provided, since <legend> is only
    // valid as a <fieldset>'s first child.
    const Tag = legend ? "fieldset" : "div";

    return <Tag style={style_} data-id={dataId} className={className_}>
        {legend ? <legend className="prismal-input-textarea-legend">{legend}</legend> : null}
        {labelPosition == "before" ? label_ : null}
        <div className={inputClass}>
            {header_}
            <textarea ref={textareaRef} onChange={doOnChange}
                className={textareaClass}
                id={id} name={name}
                rows={rows} cols={cols}
                maxLength={maxLength}
                placeholder={placeholder}
                readOnly={readOnly}
                aria-readonly={readOnly}
                disabled={disabled}
                required={required}
                aria-required={required}
                defaultValue={value as string}
                style={resize_ ? { resize: resize_ } : undefined}
            />
            {footer_}
        </div>
        {labelPosition == "after" ? label_ : null}
        {renderedErrors.length ? <ul className='input-errors'>
            {renderedErrors}
        </ul> : null}
    </Tag>
});
Textarea.displayName = "Textarea";
export default Textarea;
