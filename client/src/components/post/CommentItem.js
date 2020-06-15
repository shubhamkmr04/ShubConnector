import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/post'
import post from '../../reducers/post'
import { deleteExperience } from '../../actions/profile'
const CommentItem = ({
  postId,
  comment: { _id, text, name, user, avatar, date },
  deleteComment,
  auth,
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            style={{ borderRadius: '4px' }}
            onClick={(e) => {
              if (
                window.confirm('Are you sure you want to delete this comment?')
              ) {
                deleteComment(postId, _id)
              }
            }}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mstp = (state) => ({
  auth: state.auth,
})
export default connect(mstp, { deleteComment })(CommentItem)
