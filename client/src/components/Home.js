import React, { Component } from 'react';
import './App.css';
// import CommentForm from "./CommentForm";

class Home extends Component {
  state = {}
  componentDidMount() {
    let movies = []
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=9dc58f8026e43c67f75c2a110b7d6162')
      .then(res => res.json()).then(json => json.results.map((v, i) =>
        fetch(`http://www.omdbapi.com/?&plot=full&apikey=bc2b28c9&t=${v.title}`)
          .then(res => res.json())
          .then(res => movies.push(res))
      )).then(promises => {
        Promise.all(promises).then(res => {
          this.setState({ movies })
        })
      })
  }
  render() {
    const { movies } = this.state
    return (
      <div className="App row flex-column flex-sm-row m-auto">
        {movies && movies.map((m, i) =>
          <div key={i} className="movie-box d-flex align-items-center align-items-sm-start rounded border flex-column mx-auto mb-2 flex-sm-row">
            <img src={m.Poster} alt="" className="rounded scaleDown" />
            <div className="col-12 py-2 movie-info col-sm-7">
              <h5>{m.Title}</h5>
              <p className="m-0"><strong>Year:</strong>{m.Year}</p>
              <p className="m-0"><strong>Runtime:</strong>{m.Runtime}</p>
              <p className="m-0"><strong>Genre:</strong>{m.Genre}</p>
              <p className="m-0"><strong>Director:</strong>{m.Director}</p>
            </div>
            <button type="button" className="w-100 btn btn-primary align-self-sm-end">Edit</button>
          </div>
        )}

      </div>
    );
  }
}

export default Home;
