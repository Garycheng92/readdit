import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/post';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({getPost, post: {post, loading}, match}) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost]);
  return loading || post === null ? <Spinner /> :

  <Fragment>
    <Link to='/posts' className='btn'>
      Back to Posts
    </Link>
    <div className='posts-container'>
    <PostItem post ={post} showActions={false} />
    </div>
    <CommentForm postId={post._id} />
    <div className='posts-container'>
      {post.comments.map(comment => {
        return <CommentItem key={comment._id} comment={comment} postId={post._id} />
      })}
    </div>
    </Fragment>
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
