/// <reference types="react" />
import { InputRefType } from "../types";
import { TextInputProps } from "../TextInput";
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
declare const FileInput: import("react").ForwardRefExoticComponent<FileInputProps & import("react").RefAttributes<InputRefType | null>>;
export default FileInput;
