import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? <Spinner /> : <Fragment>
        <h1 className='large'>Users</h1>
        <p className='medium'>
        <i className="fas fa-user-friends"></i> Connect with other users
          </p>
        <div className='profiles-container'>
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : <h4 className='large'>No profiles found</h4>}
        </div>
      </Fragment>}
    </Fragment>
  )
}

Profiles.propTypes = {
getProfiles: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
