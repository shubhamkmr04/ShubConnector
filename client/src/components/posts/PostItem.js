import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { addLike, Removelike, deletePost, getPosts } from '../../actions/post'
import { deleteExperience } from '../../actions/profile'
const PostItem = ({
  addLike,
  Removelike,
  deletePost,
  auth,
  showActions,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  useEffect(() => {
    getPosts()
  }, [getPosts()])
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
        {showActions && (
          <Fragment>
            <button
              type='button'
              class='btn btn-light'
              onClick={(e) => {
                addLike(_id)
              }}
            >
              <i class='fas fa-thumbs-up'></i>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={(e) => {
                Removelike(_id)
              }}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link
              to={`/posts/${_id}`}
              style={{ borderRadius: '4px' }}
              className='btn btn-primary'
            >
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                style={{ borderRadius: '4px' }}
                type='button'
                onClick={(e) => {
                  if (
                    window.confirm('Are you sure you want to delete this post?')
                  ) {
                    deletePost(_id)
                  }
                }}
                class='btn btn-danger'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true,
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  Removelike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapstatetoprops = (state) => ({
  auth: state.auth,
})
export default connect(mapstatetoprops, { addLike, Removelike, deletePost })(
  PostItem
)
