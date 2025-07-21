import React from 'react';
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
}
const SearchBar: React.FC<SearchBarProps> = ( props ) => {
    const {
        disabled = false,
        placeholder = 'Search',
        value = '',
        onSearch,
        className,
        accent, accentDark, accentLight,
    } = props;

    let searchbarClass = 'alenite-searchbar';
    if (className) searchbarClass = `${searchbarClass} ${className}`;

    const inputRef = React.useRef<InputRefType | null>(null)
    const [ query, setQuery ] = React.useState<string | undefined>(value);
    const [ btnDisabled, setDisableState ] = React.useState(true);

    const timeoutId = React.useRef<number | undefined>(undefined);

    const prepareSearch = React.useCallback( (value?: string) => {
        // enable button
        setDisableState(false)
        if (timeoutId.current) window.clearTimeout(timeoutId.current);
        if ( value !== query ) {
            timeoutId.current = window.setTimeout( () => {
                setQuery(value)
            }, 1500)
        }
    }, [query]);

    const doSearch = React.useCallback( () => {
        if (inputRef.current?.current) {
            // Clearing timeout started from the prepareSearch method
            // is just for tidyiness (since the query state change won't trigger for same values)
            if (timeoutId.current) window.clearTimeout(timeoutId.current);

            setQuery(inputRef.current.current.value);
        }
    }, [inputRef]);

    React.useEffect( () => {
        if (!query || query === '') {
            setDisableState(true);
        } else if (onSearch) {
            setDisableState(false);
            onSearch(query);
        }
    }, [query, onSearch])
    
    return React.useMemo( () => <div className={searchbarClass}>
        <TextInput type='text'
            ref={inputRef}
            // disabled={disabled} // TODO
            value={query}
            size='l'
            name='searchbar'
            placeholder={placeholder}
            onChange={prepareSearch}
            onPressEnter={doSearch}
            accent={accent}
            accentDark={accentDark}
            accentLight={accentLight}
        />
        <Button
            iconName='search'
            onClick={doSearch}
            disabled={btnDisabled}
            accent={accent}
            accentDark={accentDark}
            accentLight={accentLight}
        />
    </div>, [searchbarClass, query, btnDisabled, accent, accentDark, accentLight, placeholder])
}

export default SearchBar;