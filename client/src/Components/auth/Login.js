import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email , password } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='landing'>
      <div className='register-container'>
      <h1 className='x-large'>Sign In</h1>
      <h3>Sign Into Account</h3>
      <form className= 'register-form' onSubmit={e => onSubmit(e)}>

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
        </div>

        <div className='reg'>
        <input type='submit'
        value='Login'
        className='register-button'
        />
        </div>
      </form>
      <p>Don't have an account?<Link to='/register'> Sign Up</Link></p>
      </div>
      </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

