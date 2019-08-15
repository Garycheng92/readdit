import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';


const PostForm = ({addPost}) => {
  const [text, setText] = useState('')
  return (
    <div>
      <h3 className='small'>Submit to Readdit</h3>
      <form className='posts-container'
      onSubmit={e => {
        e.preventDefault();
        addPost({text});
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)
