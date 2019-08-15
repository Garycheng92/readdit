import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/post';

const CommentItem = ({
  postId,
  comment : {_id, text, name, user, date},
  auth,
  deleteComment
}) => {
  return (
    <div className='comments-container line'>
      <div>
      <Link to={`/profiles/user/${user}`}>
        <h4>{name}</h4>
      </Link>
      <p><Moment fromNow>{date}</Moment></p>
      </div>
      <p>{text}</p>
      <div>
        {!auth.loading && user === auth.user._id && (
          <button onClick={e => deleteComment(postId, _id)} type='button' className='btn-misc btn'>
            <i className="fas fa-minus"></i>
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem)
