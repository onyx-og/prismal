import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { InputRefType } from "../types";
import TextInput, { TextInputProps } from "../TextInput";
import Button from "components/Button";

import "./index.scss";

/**
 * @typedef {object} FileInputProps
 * @description Props for the FileInput component.
 * @property {never} after - This prop is not applicable.
 * @property {never} before - This prop is not applicable.
 * @property {never} value - This prop is not applicable.
 * @property {boolean} [multiple] - If true, allows multiple file selection.
 */
export interface FileInputProps extends TextInputProps<"file"> {
    after: never;
    before: never;
    value: never;
    multiple?: boolean;
}

/**
 * @component FileInput
 * @description A file input component that wraps TextInput and provides file selection functionality.
 * @param {FileInputProps} props The component props.
 * @param {ForwardedRef<InputRefType | null>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered FileInput component.
 * @example
 * <FileInput label="Upload File" name="document" />
 */
const FileInput = forwardRef((props: FileInputProps, ref: ForwardedRef<InputRefType | null>) => {
    const {
        "data-id": dataId,
        name, id,
        onChange,
        validator,
        required = false,
        readOnly = false,
        disabled = false,
        inline = false,
        label, labelPosition = "before",
        labelSeparator = ':',
        labelClass,
        accept, multiple,
        className, style,
        accent, accentDark, accentLight,
        borderRadius, gridPlacement
    } = props;

    let className_ = "prismal-input-file";
    if (className) className_ = `${className_} ${className}`;

    const [file, setFile] = useState<File | File[] | null>(null);

    /**
     * @function onChangeFile
     * @description Handles the change event for the file input and updates the state.
     * @param {any} [value] The file or files selected.
     */
    const onChangeFile = useCallback((value?: any) => {
        if (value) {
            setFile(value)
            onChange && onChange(value);
        }
    },[onChange]);

    const ref_ = useRef<InputRefType | null>(null);

    useImperativeHandle<InputRefType | null, any>(ref, () => ref_.current, [ref_]);

    /**
     * @function refSetter
     * @description A callback ref to set the internal ref for the input element.
     * @param {InputRefType | null} r The input ref object.
     */
    const refSetter = useCallback((r: InputRefType | null) => {
        ref_.current = r;
    },[]);

    /**
     * @function clearFile
     * @description Clears the selected file from the state.
     */
    const clearFile = useCallback(() => {
        setFile(null);
        onChange && onChange(undefined);
    },[onChange]);

    /**
     * @function triggerSelector
     * @description Programmatically triggers the file input's click event.
     */
    const triggerSelector = useCallback(() => {
        if (ref_.current) {
            ref_.current.element?.click();
        }
    },[ref_]);

    /**
     * @member button
     * @description Memoized button element that changes based on whether a file is selected.
     * @returns {JSX.Element}
     */
    const button = useMemo(() => {
        if (file) {
            return <Button onClick={clearFile} type="text" iconName="close"/>
        } else {
            return <Button onClick={triggerSelector} type="text" iconName="upload"/>
        }
    }, [file,triggerSelector,clearFile]);

    return <TextInput data-id={dataId} htmlType='file'
        className={className_}
        label={label}
        labelClass={labelClass}
        labelPosition={labelPosition}
        labelSeparator={labelSeparator}
        onChange={onChangeFile}
        inline={inline}
        accept={accept}
        multiple={multiple}
        ref={(r) => refSetter(r)}
        style={style}
        accent={accent}
        accentLight={accentLight}
        accentDark={accentDark}
        borderRadius={borderRadius}
        readOnly={readOnly}
        required={required}
        disabled={disabled}
        validator={validator}
        gridPlacement={gridPlacement}
        value={!file ? '' : undefined}
        type={"default"}
        size='l'
        name={name}
        id={id}
        after={button}
    />
})

export default FileInput;