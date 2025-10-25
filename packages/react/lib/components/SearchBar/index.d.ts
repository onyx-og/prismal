import { FC } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} SearchBarProps
 * @description Props for the SearchBar component.
 * @property {boolean} [disabled=false] If true, the search bar is disabled.
 * @property {string} [placeholder='Search'] The placeholder text for the search input.
 * @property {string} [value=''] The initial value of the search input.
 * @property {(query: string) => void} [onSearch] Callback function fired when a search is performed.
 * @property {"outer-after" | "outer-before" | "inner-after" | "inner-before"} [btnPosition="outer-after"] The position of the search button.
 * @property {"default" | "primary"} [type="default"] The visual style of the search bar.
 */
export interface SearchBarProps extends ComponentProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onSearch?: (query: string) => void;
    btnPosition?: "outer-after" | "outer-before" | "inner-after" | "inner-before";
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
