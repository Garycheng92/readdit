import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { addComment} from '../../actions/post';

const CommentForm = ({addComment, postId}) => {
  const [text, setText] = useState('')
  return (
    <div>
      <h3 className='medium'>Leave a Comment</h3>
      <form className='posts-container'
      onSubmit={e => {
        e.preventDefault();
        addComment(postId, {text});
        setText('');
      }}>
        <textarea
        name='text'
        value={text}
        onChange={e => setText(e.target.value)}
        required
        >
        </textarea>
        <input type='submit' value='Submit' className='btn'/>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm)
