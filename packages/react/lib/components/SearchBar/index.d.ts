import { FC } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} SearchBarProps
 * @description Props for the SearchBar component.
 */
export interface SearchBarProps extends ComponentProps {
    /** If true, the search bar is disabled. */
    disabled?: boolean;
    /** The placeholder text for the search input. */
    placeholder?: string;
    /** The initial value of the search input. */
    value?: string;
    /** Callback function fired when a search is performed. */
    onSearch?: (query: string) => void;
    /** The position of the search button. */
    btnPosition?: "outer-after" | "outer-before" | "inner-after" | "inner-before";
    /** The visual style of the search bar. */
    type?: "default" | "primary";
}
/**
 * @component SearchBar
 * @description A search input component with a search button.
 * @param {SearchBarProps} props The component props.
 * @returns {React.ReactElement} The rendered SearchBar component.
 * @example
 * <SearchBar placeholder="Search for items..." onSearch={(query) => console.log(query)} />
 */
declare const SearchBar: FC<SearchBarProps>;
export default SearchBar;
