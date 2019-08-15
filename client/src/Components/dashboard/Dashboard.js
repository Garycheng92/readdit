import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions';

const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading}}) => {
  // eslint disable next line
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  return loading && profile === null ? <Spinner /> : <Fragment><section className='dash-container'>
    <h1 className='x-large'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'></i>
        Welcome, {user && user.name}!
    </p>
    {profile !== null ? <Fragment>
      <DashboardActions />
      <div className='my-1'>
        <button className='btn btn-danger' onClick={() => deleteAccount()}>
        <i class="fas fa-user-alt-slash"></i> Delete Account
        </button>
      </div>
    </Fragment> : <Fragment>
      <p>You have not yet setup a profile, please add some information.</p>
      <Link to='/create-profile' className='btn my-1'>Create Profile</Link>
      </Fragment>}
      </section>
  </Fragment>

}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile

});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
