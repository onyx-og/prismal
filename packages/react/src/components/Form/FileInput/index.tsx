import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { InputRefType } from "../types";
import TextInput, { TextInputProps } from "../TextInput";
import Button from "components/Button";

import "./index.scss";

export interface FileInputProps extends TextInputProps<"file"> {
    after: never;
    before: never;
    value: never;
    multiple?: boolean;
}
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
        placeholder,
        label, labelPosition = "before",
        labelSeparator = ':',
        labelClass,
        value, accept, multiple,
        className, style,
        accent, accentDark, accentLight,
        borderRadius, gridPlacement
    } = props;

    let className_ = "prismal-input-file";
    if (className) className_ = `${className_} ${className}`;

    const [file, setFile] = useState<File | null>(null);

    const onChangeFile = useCallback((value?: any) => {
        if (value) {
            setFile(value)
        }
    },[onChange, setFile]);

    const ref_ = useRef<InputRefType | null>(null);

    useImperativeHandle<InputRefType | null, any>(ref, () => ref_.current, [ref_]);

    const refSetter = useCallback((r: InputRefType | null) => {
        ref_.current = r;
    },[]);

    const clearFile = useCallback(() => {
        setFile(null);
    },[setFile]);

    const triggerSelector = useCallback(() => {
        if (ref_.current) {
            ref_.current.element?.click();
        }
    },[ref_]);

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
        // placeholder={placeholder}
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
        // disabled={disabled} // TODO
        type={"default"}
        size='l'
        name={name}
        id={id}
        // onChange={prepareSearch}
        // onPressEnter={doSearch}
        after={button}
    />
})

export default FileInput;