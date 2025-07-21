import React from 'react';
import './index.scss';
import ComponentProps from '../Component';
export interface SearchBarProps extends ComponentProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onSearch?: (query: string) => void;
}
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
