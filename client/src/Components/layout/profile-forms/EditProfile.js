import React, {useState, Fragment, useEffect} from 'react'
import {Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {createProfile, getCurrentProfile} from '../../../actions/profile';

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    hobbies: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    // getCurrentProfile();

    setFormData({

      location: loading || !profile.location ? '' : profile.location,
      hobbies: loading || !profile.hobbies ? '' : profile.hobbies.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,

    });
  }, [loading, profile]);

  const {
    location,
    bio,
    hobbies,
    twitter,
    facebook,
    youtube,
    instagram
  } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true)
  }

  return (
    <Fragment>
      <section className='create-container'>
      <h1 className='x-large'>Create Your Profile</h1>
        <p><i class="fas fa-user-circle"></i> Share some information about yourself</p>
        <small className='form-text'>* = required field</small>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div>

            <div className='form-group'>
              <input type='text' placeholder='Location' name='location'
              value={location}
              onChange={e => onChange(e)}
              />
              <small className='form-text'>Add your city (eg. Los Angeles, CA)</small>
            </div>

            <div className='form-group'>
              <input type='text' placeholder='* Hobbies' name='hobbies'
              value={hobbies}
              onChange={e => onChange(e)}
              />
              <small className='form-text'>Please separate with comma values (eg. Biking,Running,Sailing)</small>
            </div>

            <div className='form-group'>
              <textarea placeholder='* Bio about you' name='bio'
              value={bio}
              onChange={e => onChange(e)}
              ></textarea>
              <small className='form-text'>Tell about yourself</small>
            </div>

            <div className='form-group'>
              <input type='text' placeholder='Twitter Username' name='twitter'
              value={twitter}
              onChange={e => onChange(e)}
              />
              <small className='form-text'>Add to show your current tweets</small>
            </div>

          </div>
          <div>
            <button type='button' className='btn my-1' onClick={() => toggleSocialInputs(!displaySocialInputs)}>Add Social Network Links</button>
          </div>

          {displaySocialInputs && <Fragment>
            <div className='form-group social-input'>
            <i className='fab fa-facebook fa-2x'></i>
            <input type='text' placeholder='Facebook URL' name='facebook'
            value={'https://'+ facebook}
            onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-youtube fa-2x'></i>
            <input type='text' placeholder='Youtube URL' name='youtube'
            value={'https://'+ youtube}
            onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-instagram fa-2x'></i>
            <input type='text' placeholder='Instagram URL' name='instagram'
            value={'https://'+ instagram}
            onChange={e => onChange(e)}
            />
          </div>
          </Fragment>}



          <input type='submit' className='btn btn-primary'/>
          <Link className='btn btn-create' to='/dashboard'>Go Back</Link>
        </form>
        </section>
        </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
