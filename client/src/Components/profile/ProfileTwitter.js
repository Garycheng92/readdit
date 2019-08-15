import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getTweets} from '../../actions/profile';

const ProfileTwitter = ({username, getTweets, tweets}) => {
  useEffect(() => {
    getTweets(username);
  }, [getTweets])
  return (
    <div>
      <h2 className='medium'>Tweets</h2>
      {tweets === [] ? <Spinner /> : (
        tweets.map(tweet => {
          return <div key={tweet.id_str}>
            <div className='small'>
            {tweet.created_at}  {tweet.text}
            </div>
            </div>
        })
      )}
    </div>
  )
}

ProfileTwitter.propTypes = {
  getTweets: PropTypes.func.isRequired,
  tweets: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  tweets: state.profile.tweets
});

export default connect(mapStateToProps, {getTweets})(ProfileTwitter)
