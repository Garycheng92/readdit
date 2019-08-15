import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
  bio,
  hobbies,
  user: {
    name
  }
}}) =>
    <div className='profile-about'>
      <h2 className='medium'>{name.trim().split(' ')[0]}'s Bio</h2>
      <p>
      {bio}
        </p>
        <div className='line' />
      <h2>Hobbies</h2>
      <div className='profile-hobby'>
        {hobbies.map((hobby, index) => {
          return <div key={index} className='py-1'>
            <i class="far fa-heart"></i> {hobby}
          </div>
        })}
      </div>
    </div>



ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
