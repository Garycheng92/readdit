import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem'
import PostForm from './PostForm';

const Posts = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return loading ? <Spinner /> :
      <Fragment>
        <h1 className='large'>Posts</h1>
        <p className='medium'>Welcome to Readdit</p>
        <div>
        <PostForm />
        </div>
        <div className='posts-container'>
          {posts.map(post => {
            return <PostItem key={post._id} post={post} />
          })}
        </div>
      </Fragment>

}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
