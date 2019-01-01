import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { fetchMovies, updateMovies } from '../redux/actions/'
import Movie from './Movie'
import Modal from './Modal'

class Home extends Component {
  state = {
    editMode: false
  }
  componentDidMount() {
    const { fetchMovies } = this.props
    fetchMovies()
  }

  onEdit = (id) => {
    this.setState({ editMode: true, selectedMovie: this.props.movies[id], selectedMovieId:id })
  }

  toggle = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  handleChange = (e)=>{
    this.setState({
      selectedMovie:{...this.state.selectedMovie,[e.target.name]:e.target.value}
      })
  }

  updateMovies = () => {
    const {updateMovies, movies} = this.props
    const copy = [...movies]
    
    copy[this.state.selectedMovieId] = this.state.selectedMovie
    this.setState({selectedMovie:undefined, selectedMovieId:undefined})
    updateMovies(copy)
    this.toggle()
  }
  render() {
    const { movies } = this.props
    const { editMode, selectedMovie={} } = this.state
    const footer = { action: this.updateMovies, actionText: "Save" }
    return (
      <div className="App row flex-column flex-sm-row m-auto">
        {movies && movies.map((m, i) => <Movie key={i} movie={m} onEdit={() => this.onEdit(i)} />)}
        <Modal isOpen={editMode} toggle={this.toggle} footer={footer}>
          <form >
            <label>
              Title:
              <input type="text" name="Title" value={selectedMovie.Title || ''} onChange={this.handleChange}/>
            </label>
            <label>
              Year:
              <input type="text" name="Year" value={selectedMovie.Year || ''} onChange={this.handleChange}/>
            </label>
            <label>
              Runtime:
              <input type="text" name="Runtime" value={selectedMovie.Runtime || ''} onChange={this.handleChange}/>
            </label>
            <label>
              Genre:
              <input type="text" name="Genre" value={selectedMovie.Genre || ''} onChange={this.handleChange}/>
            </label>
            <label>
              Director:
              <input type="text" name="Director" value={selectedMovie.Director || ''} onChange={this.handleChange}/>
            </label>
          </form>
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
