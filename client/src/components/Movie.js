import React from 'react'

const Movie = (props) => {
  const { movie, onEdit } = props
  return (
    <div className="movie-box d-flex align-items-center align-items-sm-start rounded border flex-column mx-auto mb-2 flex-sm-row">
      <img src={movie.Poster} alt="" className="rounded scaleDown" />
      <div className="col-12 py-2 movie-info col-sm-7">
        <h5>{movie.Title}</h5>
        <p className="m-0"><strong>Year:</strong>{movie.Year}</p>
        <p className="m-0"><strong>Runtime:</strong>{movie.Runtime}</p>
        <p className="m-0"><strong>Genre:</strong>{movie.Genre}</p>
        <p className="m-0"><strong>Director:</strong>{movie.Director}</p>
      </div>
      <button type="button" className="w-100 btn btn-primary align-self-sm-end" onClick={onEdit}>Edit</button>
    </div>
  )
}

export default Movie;