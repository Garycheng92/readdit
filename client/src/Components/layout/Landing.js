import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
     return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'><b>Online Web Forum</b></h1>
          <p className='lead'>
            Share posts and stories from all over the web!
            </p>
          <div className='buttons'>
            <Link className='signup' to='/register'>Sign Up</Link>
            <Link className='login' to='/login'>Login</Link>
          </div>
        </div>
        </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
