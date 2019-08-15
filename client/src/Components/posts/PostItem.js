import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { Fragment } from 'react';
import {addVote, removeVote, deletePost} from '../../actions/post';


const PostItem = ({addVote, removeVote, deletePost, auth, post: {_id, text, name, user, votes, comments, date}, showActions}) => {
  return (
    <div className='post-container py-1 line'>
      <div>
      <Link to={`/profiles/user/${user}`}>
      <h4 className='user'>{name}</h4>
      </Link>
      <p className='date'><Moment fromNow>{date}</Moment></p>
      </div>
      <p className='text'>{text}</p>
      <div>
      {showActions && <div  className='action-container'>
        <button type='button' onClick={() => addVote(_id)} className='mb-1 btn-2'>
      <i className="fas fa-arrow-circle-up"></i>
      </button>
        <span className='small-2 mb-1 padding-left'>{votes.length}</span>
      <button type='button' onClick={() => removeVote(_id)} className='mb-1 btn-2'>
      <i className="fas fa-arrow-circle-down"></i>
      </button>
      <Link to={`/posts/${_id}`} className='btn-2 mb-1'> <span className='center'>Comments</span>

        <span className='center'> ({comments.length})</span>

      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type='button' onClick={() => deletePost(_id)} className='btn-2'>
          <i className="fas fa-minus"></i>
        </button>
      )}
      </div>}

      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addVote: PropTypes.func.isRequired,
  removeVote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {addVote, removeVote, deletePost})(PostItem)
