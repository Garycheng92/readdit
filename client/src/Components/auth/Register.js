import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name , email , password, password2 } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
     register({name, email, password});
    }
  }

  //Redirect
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='landing'>
      <div className='register-container register-query'>
      <h1 className='large mid'>Create Account</h1>
      <h3 className='tiny'>Sign up to see posts and videos</h3>
      <form className= 'register-form' onSubmit={e => onSubmit(e)}>
        <p>Enter Name</p>
        <div className='register-form-group'>

        <input type='text'
        placeholder='Enter Name'
        required
        name='name'
        value={name}
        onChange={e => onChange(e)}
        />

        </div>

        <p>Enter Email</p>
        <div className='register-form-group'>
        <input type='email'
        placeholder='Enter Email'
        required name='email'
        value={email}
        onChange={e => onChange(e)}
        />
          </div>

          <p>Enter Password</p>
          <div className='register-form-group'>
        <input type='password'
        placeholder='Enter Password'
        required
        minLength='8'
        name='password'
        value={password}
        onChange={e => onChange(e)}
        />
        <small className='register-text'>Password length must be 8 characters</small>
        </div>
        <p>Confirm Password</p>
        <div className='register-form-group'>
        <input type='password'
        placeholder='Confirm Password'
        required
        minLength='8'
        name='password2'
        value={password2}
        onChange={e => onChange(e)}
        />
        </div>
        <div className='reg'>
        <input type='submit'
        value='Register'
        className='register-button'
        />
        </div>
      </form>
      <p className='query-text query-mb'>Already have an account?<Link to='/login'> Sign In</Link></p>
      </div>
      </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
