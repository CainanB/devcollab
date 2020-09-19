const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const User = require('../../models/User')
const Profile = require('../../models/Profile')


// @route  POST api/posts
// @desc   create a post
// @access Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            profileimg: req.body.profileimg,
            user: req.user.id,
            title: req.body.title,
            technologies: req.body.technologies
    
        })
        
        
        await newPost.save()
        res.json(newPost)
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }

   
});

// @route  GET api/posts
// @desc   Get all posts
// @access Private

router.get('/', auth, async (req, res)=>{

    try {
        const posts = await Post.find().sort({
            date: -1
        })
        res.json(posts)
    
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }
})

// @route  GET api/posts/me
// @desc   Get all posts by specific user
// @access Private

router.get('/me', auth, async (req, res)=>{

    try {
        const posts = await Post.find().sort({
            date: -1
        })

        const userPosts = posts.filter(post => post.user.toString() === req.user.id)
        res.json(userPosts)
    
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }
})


// @route  GET api/posts/:id
// @desc   Get post by id
// @access Private

router.get('/:id', auth, async (req, res)=>{

    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: "Post not found"});
        }
        res.json(post)
    
    } catch (error) {
        console.error(error.message)
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"});
        }
        res.send(500).send('Server Error')
    }
})




// @route  Delete api/posts/:id
// @desc   Delete a specific
// @access Private

router.delete('/:id', auth, async (req, res)=>{

    try {
        const post = await Post.findById(req.params.id)
        // const user = await User.findById(post.user)
        if(!post){
            return res.status(404).json({msg: "Post not found"});
        }
        

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized"})
        }
      
        await post.remove()
        res.json({msg: "Post has been deleted"})
    
    } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"});
        }
        console.error(error.message)
        res.send(500).send('Server Error')
    }
})

// @route  PUT api/posts/like/:id
// @desc   add a like to post
// @access Private

router.put('/like/:id', auth, async (req, res) =>{
  

    try {

        const post = await Post.findById(req.params.id)

        if(post.likes.filter(like => like.user.toString()===req.user.id).length > 0){
            return res.status(400).json({msg: "Post already liked"})
        }

        post.likes.unshift({user: req.user.id})
        await post.save()

        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }

   
});


// @route  PUT api/posts/unlike/:id
// @desc   add a like to post
// @access Private

router.put('/unlike/:id', auth, async (req, res) =>{
  

    try {

        let post = await Post.findById(req.params.id)

        if(post.likes.filter(like => like.user.toString()===req.user.id).length === 0){
            return res.status(400).json({msg: "Post has not yet been liked"})
        }

        post.likes = post.likes.filter(like => like.user.toString() !== req.user.id)
        await post.save()

        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }

   
});



// @route  PUT api/posts/comment/:id
// @desc   add a comment to post
// @access Private

router.post('/comment/:id', [auth, [
    check('commentText', 'Text is required').not().isEmpty()
]], async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id)
        const newComment = {
            text: req.body.commentText,
            name: user.name,
            profileimg: req.body.profileimg,
            user: req.user.id
    
        }
        post.comments.push(newComment)
        
        await post.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }

   
});



// @route  delete api/posts/comment/:postID/delete/:commentID
// @desc   delete comment from a post
// @access Private

router.delete('/comment/:postID/delete/:commentID', auth, async (req, res) =>{
   
    
    try {

        
        const post = await Post.findById(req.params.postID)
        
        let commentToDelete = post.comments.find(comment => comment.id === req.params.commentID)

        if(commentToDelete.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Comment does not belong to user"})
        }
        
        post.comments = post.comments.filter(comment => comment.id !== req.params.commentID)
        
        
       
        // post.comments.map(comment => comment.user.toString() === req.user.id ? console.log(comment): null )
      
        
        await post.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.send(500).send('Server Error')
    }

   
});







//  ROUTE TO LIKE POSTS
// router.put('/like/:id', auth, async (req, res) =>{
  

//     try {

//         const post = await Post.findById(req.params.id)

//         let currentLike = post.likes.find(like => like.user.toString() === req.user.id)
//         if(currentLike){
//             return res.status(401).json({msg: "Post already liked by user"})
//         }
//         post.likes.unshift({user: req.user.id})
//         await post.save()
//         res.json(post)
//     } catch (error) {
//         console.error(error.message)
//         res.send(500).send('Server Error')
//     }

   
// });

module.exports = router;