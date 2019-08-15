const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('request');
const twit = require('../../middleware/twit');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route  GET api/profile/me
//@desc   Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id }).populate('user', ['name'])

    if (!profile) {
      return res.status(400).json({msg: 'There is no profile for this user'})
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/profile
//@desc   create or update user profile
//@access Private

router.post('/', [auth,
  [
    check('bio', 'Bio is required')
      .not()
      .isEmpty(),
    check('hobbies', 'Hobbies are required')
      .not()
      .isEmpty()
  ]], async (req, res) => {
    const errors = validationResult(req);
    // If there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const validToken = await User.findById(decoded.user.id);

    if (!validToken) {
      return res.status(400).json('Invalid token')
    }

    const {
      location,
      bio,
      youtube,
      facebook,
      twitter,
      instagram,
      hobbies
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;

    if (hobbies) profileFields.hobbies = hobbies.split(',').map(hobby => hobby.trim())

    //Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;


    try {
      //Find Profile
      let profile = await Profile.findOne({user: req.user.id});

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
          );
          return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);

      await profile.save()
      res.json([profile])
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
});

//@route  GET api/profiles
//@desc   get all profiles
//@access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


//@route  GET api/profiles/user/:user_id
//@desc   get profile by user id
//@access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name']);

    if (!profile)
      return res.status(400).json({msg: 'Profile not Found'});

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({msg: 'Profile not Found'})
    }
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/profiles
//@desc   Delete profile, user and posts
//@access Private

router.delete('/', auth, async (req, res) => {
  try {
    //Remove user Posts
    await Post.deleteMany({user: req.user.id})

    //Remove Profile
    await Profile.findOneAndRemove({user: req.user.id})
    //Remove User
    await User.findOneAndRemove({_id: req.user.id})
    res.json({msg: 'User Deleted'})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});
//@route  GET api/profiles/twit/:username
//@desc   Get user data from Twitter
//@access Public
router.get('/twit/:username', twit);

module.exports = router;