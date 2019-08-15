import React from 'react'
import {Link} from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to='/edit-profile' class='btn'>
      <i className="fas fa-user-edit"></i> Edit Profile</Link>
    </div>
  )
}

export default DashboardActions
