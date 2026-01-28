/*import React from 'react'
import star from '../assets/star-icon.svg';
import no from '../assets/No-Poster.png';

const MovieCard = ({movie:
    { title,vote_average,poster_path,release_date, original_language}
    }) => {
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`:
        {no}}
        alt={title}
        />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'>
                  <img src={star} alt="Star Icon"/>
                </div>
            '
             </div>
        </div>
    </div>
  )
}

export default MovieCard */
import React from 'react';
import star from '../assets/Rating.svg';
import no from '../assets/No-Poster.png';

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language }
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : no
        }
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src={star} alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span className="lang">{original_language}</span>
          <span className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </span>
          
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
