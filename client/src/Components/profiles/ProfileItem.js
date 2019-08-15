import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

const ProfileItem = ({profile: {
  user: {_id, name},
  location,
  hobbies
}}) => {
  return (
    <Fragment>
      <div className='item-container'>
      <div className='items-container'>
      <h2 className='mid'>{name}</h2>
    <ul>
      {hobbies.slice(0, 4).map((hobby, index) => (
        <li key={index}>
          <i className="far fa-heart"></i> <span className='tiny'> {hobby}</span>
        </li>
      ))}
    </ul>


    <Link to={`/profiles/user/${_id}`} className='btn-2 center'>
        View Profile
      </Link>
      <p>{location && <span className='tiny'>{location}</span>}</p>
      </div>
    </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
