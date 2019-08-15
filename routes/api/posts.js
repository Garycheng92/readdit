const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route  POST api/posts
//@desc   Create a post
//@access Private
router.post('/', [auth,
  [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

  const newPost = new Post ({
    text: req.body.text,
    name: user.name,
    user: user.id
  })

  const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }

});

//@route  GET api/posts
//@desc   Get all posts
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1});
    res.json(posts)
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//@route  GET api/posts/:id
//@desc   Get post by id
//@access Private
router.get('/:id', auth, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({msg: 'Post not found'})
    }
    res.json(post)
  } catch (error) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'})
    }
    res.status(500).send('Server Error')
  }
})

//@route  DELETE api/posts/:id
//@desc   Delete a post
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {

    //Find user
    const post = await Post.findById(req.params.id);

    //If there is no post
    if (!post) {
      return res.status(404).json({msg: 'Post not found'})
    }

    //Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'User not authorized'})
    }
    await post.remove()

    res.json({msg: 'Post removed'})
  } catch (error) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'})
    }
    res.status(500).send('Server Error')
  }
});

//@route  PUT api/posts/vote/:id
//@desc   Vote on a post
//@access Private

router.put('/vote/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post has been voted
    //If the post array user id matches the logged in user id and length of the filtered array is greater than 0
    if (post.votes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({msg: 'Post already voted'})
    }

    //Up vote
    post.votes.unshift({user: req.user.id});

    await post.save();
    res.json(post.votes)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


//@route  PUT api/posts/downvote/:id
//@desc   Vote on a post
//@access Private

router.put('/downvote/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post has been voted
    //If the post array user id matches the logged in user id and length of the filtered array is 0
    if (post.votes.filter(vote => vote.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({msg: 'Post has not been voted'})
    }

    //Down vote
    //Get remove index
    const removeIndex = post.votes.map(vote => vote.user.toString()).indexOf(req.user.id)

    post.votes.splice(removeIndex, 1);
    await post.save();
    res.json(post.votes)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//@route  PUT api/posts/comment/:id
//@desc   Comment on a post
//@access Private
router.put('/comment/:id', [auth,
  [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    name: user.name,
    user: user.id
  };

  post.comments.unshift(newComment);

  await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }

});

//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   Delete a comment
//@access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({msg: 'Comment does not exist'});
    }
    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'User not authorized'});
    }

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments)


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

module.exports = router;