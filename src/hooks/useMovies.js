import testData from '../mocks/test_data.json'
import testNoData from '../mocks/test_no_data.json'
import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies';

export function useMovies({ search , sort }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef(search);

    /*const getMovies = useMemo(() => {
        return async ({ search, setSort }) => {
            if (search === previousSearch.current) return;
            try {
                setLoading(true);
                setError(null);
                previousSearch.current = search;
                const newMovies = await searchMovies({ search });
                setMovies(newMovies);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
                setSort('none');
            }
        }
    }, []);*/

    const getMovies = useCallback(async ({ search, setSort }) => {
        if (search === previousSearch.current) return;
        try {
            setLoading(true);
            setError(null);
            previousSearch.current = search;
            const newMovies = await searchMovies({ search });
            setMovies(newMovies);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
            setSort('none');
        }
    }, []);

    const ordenations = {
        none: (list) => list,
        yearMayorMinor: (list) => list.sort((a, b) => b.year - a.year),
        yearMinorMayor: (list) => list.sort((a, b) => a.year - b.year),
        titleMayorMinor: (list) => list.sort((a, b) => a.title.localeCompare(a.title)),
        titleMinorMayor: (list) => list.sort((a, b) => b.title.localeCompare(a.title))
    };
    
    const sortedMovies = useMemo(() => {
        return movies ? ordenations[sort]([...movies]) : movies;
        console.log(sort);
    }, [sort, movies]);

    return { movies: sortedMovies, getMovies, loading };
}
