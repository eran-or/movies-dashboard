import { REQUEST_MOVIES, RECEIVE_MOVIES } from './actionTypes'
function requestMovies() {
  return {
    type: REQUEST_MOVIES
  }
}
function receiveMovies(movies) {
  
  return {
    type: RECEIVE_MOVIES,
    movies: movies.map(movie=>{
      movie.Title = movie.Title.replace(/[^\w* -]/g,"").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
      return movie
    }),
    receivedAt: Date.now()
  }
}

export const fetchMovies = (s) => {
  const themoviedbUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=9dc58f8026e43c67f75c2a110b7d6162'
  const omdbapiUrl = 'http://www.omdbapi.com/?&plot=full&apikey=bc2b28c9&t='
  return dispatch => {
    dispatch(requestMovies())
    let movies = []
    return fetch(themoviedbUrl)
    .then(res => res.json()).then(json => json.results.map((v, i) =>
      fetch(`${omdbapiUrl}${v.title}`)
        .then(res => res.json())
        .then(res => movies.push(res)).catch(e => console.log(e))
    )).then(promises => {
      Promise.all(promises).then(res => {
        dispatch(receiveMovies(movies))
      })
    }).catch(e => console.log(e))
  }
}

export const updateMovies = (movies) => {
  return dispatch => {
    dispatch(receiveMovies(movies))
  }
}