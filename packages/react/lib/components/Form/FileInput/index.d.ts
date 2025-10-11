/// <reference types="react" />
import { InputRefType } from "../types";
import { TextInputProps } from "../TextInput";
import "./index.scss";
export interface FileInputProps extends TextInputProps<"file"> {
    after: never;
    before: never;
    value: never;
    multiple?: boolean;
}
declare const FileInput: import("react").ForwardRefExoticComponent<FileInputProps & import("react").RefAttributes<InputRefType | null>>;
export default FileInput;
