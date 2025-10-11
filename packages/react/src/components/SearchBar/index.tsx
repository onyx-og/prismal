import {FC, useState, useMemo, useRef, useCallback, useEffect } from 'react';
import './index.scss';

import TextInput from 'components/Form/TextInput';
import { InputRefType } from 'components/Form/types';
import Button from 'components/Button';
import ComponentProps from '../Component';
// TODO: Consider the creation and usage of a Form.SearchInput
// instead of Form.TextInput. The idea is to better integrate 
// the button inside the input component tree

export interface SearchBarProps extends ComponentProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onSearch?: (query: string) => void;
    btnPosition?: "outer-after" | "outer-before" | "inner-after" | "inner-before";
    type?: "default" | "primary";
}
const SearchBar: FC<SearchBarProps> = ( props ) => {
    const {
        disabled = false,
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
    const [ query, setQuery ] = useState<string | undefined>(value);
    const [ btnDisabled, setDisableState ] = useState(true);

    const timeoutId = useRef<NodeJS.Timeout>(null);

    const prepareSearch = useCallback( (value: any) => {
        // enable button
        // setDisableState(false)
        if ( !!!value ) setDisableState(true)
        else setDisableState(false)
        if ( value !== query ) {
            timeoutId.current = setTimeout( () => {
                setQuery(value)
            }, 1500)
        }
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        }
    }, [query]);

    const doSearch = useCallback( () => {
        if (inputRef.current?.element) {
            // Clearing timeout started from the prepareSearch method
            // is just for tidyiness (since the query state change won't trigger for same values)
            if (timeoutId.current) window.clearTimeout(timeoutId.current);

            setQuery(inputRef.current.element.value);
        }
    }, [inputRef]);

    useEffect( () => {
        if (!query || query == '') {
           // setDisableState(true);
        } else if (onSearch) {
           // setDisableState(false);
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
    />,[doSearch, btnDisabled, type, accent, accentDark, accentLight, btnPosition]);
    
    return <div className={componentClass}>
        {btnPosition == "outer-before" ? searchBtn : undefined}
        <TextInput htmlType='text'
            ref={inputRef}
            // disabled={disabled} // TODO
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