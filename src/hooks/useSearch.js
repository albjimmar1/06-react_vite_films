import { useState, useEffect, useRef } from 'react'

export function useSearch() {
    const [search, updateSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);
    
    if (search.startsWith(' ')) {
        updateSearch('');
    }

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === '';
            return;
        }
        if (search === '') {
            setError('Cannot search for a empty string.');
            return;
        }
        /*if (newQuery.match(/^\d+$/)) {
          setError('Cannot search for a number');
          return;
        }*/
        setError(null);
    }, [search]);

    return { search, updateSearch, error };
}