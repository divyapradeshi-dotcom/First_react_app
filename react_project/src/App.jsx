 /*import React from 'react'
import heroImg from './assets/hero-img.png';

import bg from './assets/Back_ground.png';
import Search from './components/Search';
import  { useState } from 'react';


const App = () => {
 const [searchTerm, setSearchTerm]=useState('');

  return (
    <main>
      <img src={bg} alt="background"/>
      <div className="pattern"/>
     
    <div className="wrapper">
      <header>
          <img src={heroImg} alt="Hero Banner" />
          
        <h1 >Find <span className="text-gradient">Movies</span>  You'll Enjoy Without the Hassle</h1>
      </header>
       
       <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
       
    </div>
    </main>
  )
}

export default App
*/
import React, { useEffect, useState } from "react";
import heroImg from "./assets/hero-img.png";
import bg from "./assets/Back_ground.png";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [trendingMovies, setTrendingMovies]=useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      // ✅ Save movies
      setmovieList(data.results || []);

      // ✅ Update search count if searching
      if (query && data.results && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
 const loadTrendingMovies=async()=>{
  try{
    const movies=await getTrendingMovies();
    setTrendingMovies(movies);
  }catch(error){
    console.log(`Error fethching trending movies:${error}`);
    
  }

  }
 

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  },[])
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <div
        className="pattern absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="wrapper relative z-10 px-5 py-12 xs:p-10">
        <header className="flex flex-col items-center text-center space-y-4">
          <img
            src={heroImg}
            alt="Hero Banner"
            className="w-40 md:w-60 lg:w-72 mx-auto"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug">
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
       
      
{ /* {trendingMovies.length > 0 && (
  <section className="treding">
    <h2>Trending Movies</h2>

    <ul>
      {trendingMovies.map((movie, index) => (
        <li key={movie.$id}>
          <p>{index + 1}</p>
          <img src={movie.poster_url} alt={movie.title} />
        </li>
      ))}
    </ul>
  </section>
)} */}


        <section className="all-movies">
          <h2 > All Movies </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
