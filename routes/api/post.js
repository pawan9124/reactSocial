const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const passport = require('passport');
const validatePostInput = require('../../validator/post');

//@route GET api/userPost/test
//@desc Tests userPost route
//@access Public
router.get('/test',(req,res)=> res.json({msg:'Post Works'}));

//@route GET api/posts
//@desc Create post
//@access Public
router.get('/',(req,res)=>{
	Post.find()
		.sort({date:-1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopostsfound:'No posts found'}));
});

//@route GET api/posts/:id
//@desc Create post by id
//@access Public
router.get('/:id',(req,res)=>{
	Post.findById(req.params.id)
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopostFound:'No post Found with that ID'}));
});

//@route Post api/posts
//@desc Create post
//@access Private
router.post('/', passport.authenticate('jwt',{session:false}),(req,res)=>{
	const { errors, isValid } = validatePostInput(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text:req.body.text,
		name:req.body.name,
		avatar:req.body.avatar,
		user:req.user.id
	});

	newPost.save().then(post=>res.json(post));
});

//@route DELETE api/posts/:id
//@desc DELETE post
//@access Private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post =>{
					//Check for the owner
					if(post.user.toString() !== req.user.id){
						return res.status(401).json({notauthorized: 'User not authorized'});
					}
					//Delete
					post.remove().then(()=>res.json({success:true}));
				})
				.catch(err=>res.status(404).json({postnotfound:'No post found'}));
		})
});

//@route POST api/posts/like/:id
//@desc Like Post
//@access Private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post =>{
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
						return res.status(400).json({alreadyLiked:'User already Liked this post'});
					}

					//Add user id to likes array
					post.likes.unshift({user:req.user.id});

					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound:'No post found'}));
		});
});

//@route POST api/posts/unlike/:id
//@desc Unlike Post
//@access Private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post =>{
					if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
						return res.status(400).json({notLiked:'You have not liked this post'});
					}

					//Get remove index
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					// Splice out of array
					post.likes.splice(removeIndex,1);

					//save
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound:'No post found'}));
		});
});

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	const {errors, isValid } = validatePostInput(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}
	Post.findById(req.params.id)
		.then(post =>{
			const newComment = {
				text:req.body.text,
				name:req.body.name,
				avatar:req.body.avatar,
				user:req.user.id
			}

			//Add to comments array
			post.comments.unshift(newComment);
			//save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: 'No post found'}));
})

//@route DELETE api/posts/comment/:id/:comment_id
//@desc DELETE comment from post
//@access Private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

	Post.findById(req.params.id)
		.then(post =>{

			if(post.comments.filter(comment => comment.id.toString() === req.params.comment_id).length === 0){
				return res.status(400).json({commentnotfound:'Comment not found'});
			}

			const removeIndex = post.comments.map(comment => comment.id.toString).indexOf(req.params.comment_id);
			
			//remove index
			post.comments.splice(removeIndex,1);
			//save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: 'No post found'}));
})


module.exports = router;