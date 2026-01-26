import React from 'react'
import heroImg from './assets/hero-img.png';

import bg from './assets/Back_ground.png';
import Search from './components/Search';
import  { useState } from 'react';


const App = () => {
 const [searchTerm, setSearchTerm]=useState('');

  return (
    <main>
      
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