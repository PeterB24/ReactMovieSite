import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

//import Gif from './Gif'

import './App.css';
import SearchIcon from './search.svg';
import loadGif from './LoadingScreen.webp';

import BounceLoader from "react-spinners/BounceLoader";
//import './LoadingScreen.css';
// New API key: 23023cff

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=23023cff';

const GIF_API = 'https://api.giphy.com/v1/gifs/search?api_key=o79iYoindHKI0kvgvkrK9HR3XrMTYFUz&q=loading&limit=25&offset=0&rating=g&lang=en';

// API key for loading screen gif o79iYoindHKI0kvgvkrK9HR3XrMTYFUz


const App = () => {
    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(false);

    {/*const KeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm)
        } else {

        }
    }*/}
    
    const searchGif = async () => {
        const retreival = await fetch(`${GIF_API}`);
        const resultGif = await retreival.json();

        return resultGif.url;
    }

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
        console.log(data);
    }

    useEffect(() => {
        searchMovies('Harry')
    }, []);

    //On every Render, a loading screen will come up.
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    return (
       <div className="app">
        
       
        {
        setLoading(true) ? (
            <h1 style={{backgroundColor: "black"}}></h1>
            <BounceLoader
            color={"#fdd776"}
            loading={loading}
            cssOverride={App.css}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
        ) : (
            <h1>MovieLand</h1>
        )    
        }
    
        

        
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
            onKeyUp={(e) => 
                {if (e.key === 'Enter') {
                    setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    searchMovies(searchTerm);
                }, 2000);

                if (setLoading(true)) {
                    <BounceLoader
                    color={"#e98318"}
                    loading={loading}
                    cssOverride={'./App.css'}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                }}
                }
            }
            />
        <img
            src={SearchIcon}
            alt='search'
            onClick={() => {
                <img src ={loadGif} alt='loading...' />
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    searchMovies(searchTerm);
                }, 2000);

                if (setLoading(true)) {
                    <BounceLoader
                    color={"#e98318"}
                    loading={loading}
                    cssOverride={'./App.css'}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                }
                

            }}
            
           
        />

        
    
       </div>

        
        
            movies?.length > 0
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div> 
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        
       </div>
    );
    
}

export default App;