import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile: {
  location,
  social,
  user: {
    name
  }
}}) => {
  return (
    <div className='profile-container'>
      <h1 className='large'>{name}</h1>
      <p className='medium'>{location && <span> Located in {location}</span>}</p>
      <div className='medium'>
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i class="fab fa-facebook-square social-profile"></i>
          </a>
        )}
         {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i class="fab fa-instagram social-profile"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i class="fab fa-youtube social-profile"></i>
          </a>
        )}
      </div>
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileTop
