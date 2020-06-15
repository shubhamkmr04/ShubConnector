import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'
import { connect } from 'react-redux'
const PostForm = ({ addPost }) => {
  const [text, setText] = useState('')
  const submit = (e) => {
    e.preventDefault()
    addPost({ text })
    setText('')
  }
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form class='form my-1'>
        <textarea
          style={{ outline: 'none' }}
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Create a post'
          required
        ></textarea>
        <input
          onClick={submit}
          type='submit'
          class='btn btn-dark my-1'
          value='Submit'
          style={{ borderRadius: '4px' }}
        />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
