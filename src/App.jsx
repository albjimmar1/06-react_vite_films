import './App.css'
import testData from './mocks/test_data.json'
import { useState, useCallback } from 'react'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import debounce from 'just-debounce-it'

function App() {
  //const inputRef = useRef();
  const [sort, setSort] = useState('none');
  const { search, updateSearch, error, isFirstInput } = useSearch('');
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSummit = (event) => {
    event.preventDefault();
    //const { query } = Object.fromEntries(new window.FormData(event.target));
    /*const imputElement = inputRef.current;
    const value = imputElement.value;*/
    getMovies({ search , setSort });
  }

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search, setSort });
    }, 500), []
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  }

  const handleSort = (event) => {
    setSort(event.target.value);
  }

  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSummit}>
          <input onChange={handleChange} value={search} name='query' /*ref={inputRef}*/ type='text' size='40' placeholder='Avengers, Dangeons & Dragons, Dune...' />
          <button type='submit'>Search</button>
          <div className='order'>
            <label>Order by</label>
            <select  name='ordenations' onChange={handleSort} value={sort}>
              <option value='none' hidden></option>
              <option value='yearMayorMinor'>year ↑</option>
              <option value='yearMinorMayor'>year ↓</option>
              <option value='titleMayorMinor'>title ↑</option>
              <option value='titleMinorMayor'>title ↓</option>
            </select>
          </div>
          </form>
        {error && <p style={{
          textAlign: 'center',
          color: 'red'
        }} className='error'>{error}</p>}
        {isFirstInput.current && <p style={{
          textAlign: 'center'
        }}>Showing default data, try typing in the search engine</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> :
          <Movies movies={!isFirstInput.current ? movies :
            testData.Search.map(movie => ({
              id: movie.imdbID,
              title: movie.Title,
              year: movie.Year,
              poster: movie.Poster
            }))} />
        }
      </main>
    </div>
  );
}

export default App
