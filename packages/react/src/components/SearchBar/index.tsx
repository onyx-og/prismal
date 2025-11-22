import { FC, useState, useMemo, useRef, useCallback, useEffect } from 'react';
import './index.scss';

import TextInput from 'components/Form/TextInput';
import { InputRefType } from 'components/Form/types';
import Button from 'components/Button';
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
const SearchBar: FC<SearchBarProps> = (props) => {
    const {
        placeholder = 'Search',
        value = '',
        onSearch,
        className,
        accent, accentDark, accentLight,
        type = "default",
        btnPosition = "outer-after"
    } = props;

    let componentClass = 'prismal-searchbar';
    if (className) componentClass = `${componentClass} ${className}`;
    componentClass = `${componentClass} prismal-search-btn-${btnPosition}`;
    componentClass = `${componentClass} prismal-search-${type}`;


    const inputRef = useRef<InputRefType>(null)
    const [query, setQuery] = useState<string | undefined>(value);
    const [btnDisabled, setDisableState] = useState(true);

    // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setTimeout>` for browser compatibility.
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * @function prepareSearch
     * @description Prepares the search by setting the query after a delay.
     * @param {any} value The input value.
     * @returns {() => void} A cleanup function to clear the timeout.
     */
    const prepareSearch = useCallback((value: any) => {
        if (!!!value) setDisableState(true)
        else setDisableState(false)
        if (value !== query) {
            if (timeoutId.current) clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => {
                setQuery(value)
            }, 1500)
        }
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        }
    }, [query]);

    /**
     * @function doSearch
     * @description Immediately performs the search with the current input value.
     */
    const doSearch = useCallback(() => {
        if (inputRef.current?.element) {
            if (timeoutId.current) window.clearTimeout(timeoutId.current);
            setQuery((inputRef.current.element as HTMLInputElement).value);
        }
    }, [inputRef]);

    useEffect(() => {
        if (query && onSearch) {
            onSearch(query);
        }
    }, [query, onSearch]);

    const searchBtn = useMemo(() => <Button
        iconName='search'
        onClick={doSearch}
        type={btnPosition.startsWith("inner") ? 'text' : type}
        disabled={btnDisabled}
        accent={accent}
        accentDark={accentDark}
        accentLight={accentLight}
    />, [doSearch, btnDisabled, type, accent, accentDark, accentLight, btnPosition]);

    return <div className={componentClass}>
        {btnPosition == "outer-before" ? searchBtn : undefined}
        <TextInput htmlType='text'
            ref={inputRef}
            type={type}
            value={query}
            size='l'
            name='searchbar'
            placeholder={placeholder}
            onChange={prepareSearch}
            onPressEnter={doSearch}
            accent={accent}
            after={btnPosition == "inner-after" ? searchBtn : undefined}
            before={btnPosition == "inner-before" ? searchBtn : undefined}
            accentDark={accentDark}
            accentLight={accentLight}
        />
        {btnPosition == "outer-after" ? searchBtn : undefined}
    </div>
}

export default SearchBar;