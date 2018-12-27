import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setComment } from '../redux/actions/comments'

class CommentForm extends Component {
  state = {
    text: ""
  }
  handleChange = (e) => {
    const text = e.target.value
    console.log(text);
    this.setState({ text })
  }
  render() {
    const { setComment, comments } = this.props
    const { text } = this.state
    console.log(comments)
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <input type="button" value="Add Comment" onClick={()=>setComment(text)} />
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
 console.log(state);
  
  return ({
  comments: state.comments
})
}
const mapDispatchToProps = (dispatch) => ({
  setComment: (text) => dispatch(setComment(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)