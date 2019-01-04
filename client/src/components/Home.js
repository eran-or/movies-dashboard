import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { fetchMovies, updateMovies } from '../redux/actions/'
import Movie from './Movie'
import Modal from './Modal'
import isValidYear from '../helpers/checkValidYear'
class Home extends Component {
  state = {
    toggle: {
      editMode: false,
      deleteMode: false,
      addMode: false
    },
    selectedMovie: {},
    errorText: '',
  }
  componentDidMount() {
    const { fetchMovies } = this.props
    fetchMovies()
  }

  handleAction = (action, id) => {
    const mode = ["editMode", "deleteMode", "addMode"].find((e) => e === action)

    const selectedMovie = (mode === "addMode") ? undefined : this.props.movies[id]
    const selectedMovieId = (mode === "addMode") ? undefined : id
    this.setState({ toggle: { ...this.state.toggle, [mode]: true }, selectedMovie, selectedMovieId })
  }

  toggle = (mode) => {
    this.setState({ toggle: { ...this.state.toggle, [mode]: !this.state.toggle[mode] }, errorText: "" })
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    let errorText = ""

    if (value === '') {
      errorText = "empty fields are not allowed!"
    } else if (name === 'Year') {
      if (!isValidYear(value)) {
        errorText = "It Must be a valid year"
      }

    }
    this.setState({ selectedMovie: { ...this.state.selectedMovie, [name]: value }, errorText })
  }

  updateMovies = (action) => {
    const { updateMovies, movies } = this.props
    const { selectedMovie = {}, selectedMovieId, errorText } = this.state

    if (errorText) {
      return false
    }

    const copy = [...movies]
    if (action !== "deleteMode") {
      const keys = ["Title", "Year", "Runtime", "Genre", "Director"]

      for (let key of keys) {
        if (!selectedMovie[key]) {
          this.setState({ errorText: "empty fields are not allowed!" })
          return false
        }
      }

      if (!isValidYear(selectedMovie["Year"])) {
        this.setState({ errorText: "It Must be a valid year" })
        return false
      }

      const movieExist = copy.find(e => selectedMovie.Title.localeCompare(e.Title, 'en', { sensitivity: 'base' }) === 0)
      if (movieExist) {
        this.setState({ errorText: "Movie exist, Please choose another Title." })
        return false
      }

    }


    if (action === "deleteMode") {
      copy.splice(selectedMovieId, 1)
    }
    if (action === "editMode") {
      copy[selectedMovieId] = selectedMovie
    }
    if (action === "addMode") {
      copy.unshift(selectedMovie);
    }

    this.setState({ selectedMovie: undefined, selectedMovieId: undefined })
    updateMovies(copy)
    this.toggle(action)
  }

  render() {
    const { movies } = this.props
    const { toggle, selectedMovie = {}, errorText, selectedMovieId } = this.state
    const { editMode, deleteMode, addMode } = toggle
    const editModalFooter = { action: () => this.updateMovies("editMode"), actionText: "Save" }
    const deleteModalFooter = { action: () => this.updateMovies("deleteMode"), actionText: "OK" }
    const addModalFooter = { action: () => this.updateMovies("addMode"), actionText: "OK" }
    const selectedMode = (selectedMovieId !== undefined) ? editMode : addMode
    const modalFooter = (selectedMovieId !== undefined) ? editModalFooter : addModalFooter
    const toggleMode = (selectedMovieId !== undefined) ? "editMode" : "addMode"

    return (
      <div className="App row flex-column flex-sm-row m-auto">
        <button className="btn btn-link" type="button" onClick={() => this.handleAction("addMode")}>Add New Movie</button>
        {movies && movies.map((m, i) => <Movie key={i} movie={m} onEdit={() => this.handleAction("editMode", i)} onDelete={() => this.handleAction("deleteMode", i)} />)}
        <Modal isOpen={selectedMode} toggle={() => this.toggle(toggleMode)} footer={modalFooter}>
          <form >
            <div className="form-row">
              <label className="col">
                Title:
              <input className="form-control" type="text" name="Title" value={selectedMovie.Title || ''} onChange={this.handleChange} />
              </label>
              <label className="col">
                Year:
              <input className="form-control" type="text" name="Year" value={selectedMovie.Year || ''} onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-row">
              <label className="col">
                Runtime:
              <input className="form-control" type="text" name="Runtime" value={selectedMovie.Runtime || ''} onChange={this.handleChange} />
              </label>
              <label className="col">
                Genre:
              <input className="form-control" type="text" name="Genre" value={selectedMovie.Genre || ''} onChange={this.handleChange} />
              </label>
            </div>
            <label>
              Director:
              <input className="form-control" type="text" name="Director" value={selectedMovie.Director || ''} onChange={this.handleChange} />
            </label>
            <div className="form-row">
              {errorText && <div className="m-0 alert alert-danger">{errorText}</div>}<div className="m-0 alert">&nbsp;</div>
            </div>
          </form>
        </Modal>
        <Modal isOpen={deleteMode} toggle={() => this.toggle("deleteMode")} footer={deleteModalFooter}>
          Are you sure you want to delete this movie?
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies
})

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => dispatch(fetchMovies()),
  updateMovies: (movies) => dispatch(updateMovies(movies)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
