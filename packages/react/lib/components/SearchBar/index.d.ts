import { FC } from 'react';
import './index.scss';
import ComponentProps from '../Component';
export interface SearchBarProps extends ComponentProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onSearch?: (query: string) => void;
    btnPosition?: "outer-after" | "outer-before" | "inner-after" | "inner-before";
    type?: "default" | "primary";
}
declare const SearchBar: FC<SearchBarProps>;
export default SearchBar;
