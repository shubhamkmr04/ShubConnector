import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addComment, deleteComment } from '../../actions/post'
import { connect } from 'react-redux'

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('')
  const submit = (e) => {
    e.preventDefault()
    addComment(postId, { text })
    setText('')
  }
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form class='form my-1'>
        <textarea
          style={{ outline: 'none' }}
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a public comment...'
          required
        ></textarea>
        <input
          style={{ borderRadius: '4px' }}
          onClick={submit}
          type='submit'
          class='btn btn-dark my-1'
          value='Submit'
        />
      </form>
    </div>
  )
}

CommentForm.propTypes = {}

export default connect(null, { addComment, deleteComment })(CommentForm)
