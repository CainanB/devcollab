const express = require('express');
const config = require('config')
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const {
    check,
    validationResult
} = require('express-validator')
const axios = require('axios')


// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        const posts = await Post.find().sort({
            date: -1
        })
        const userPosts = posts.filter(post => post.user.toString() === req.user.id)

        if (!profile) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json({profile, userPosts})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  Post api/profile/me
// @desc   create or udate users profile
// @access Private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    // Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({
            user: req.user.id
        })

        // IF Profile exists update fields
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            })

            return res.json(profile);
        }
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route  GET api/profile
// @desc   Get all profiles
// @access Public

router.get('/', async (req, res) =>{
    try {
        const profiles = await Profile.find().populate(
            'user', ['name', 'avatar']
        );
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.send(500).send('Server Error')
    }
})


// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public

router.get('/user/:user_id', async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}
            ).populate(
            'user', ['name', 'avatar']
        );

        if(!profile){
            return res.status(400).json({msg: "Profile not found"})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: "Profile not found"})
        }
        res.send(500).send('Server Error')
    }
})

// @route  DELETE api/profile
// @desc   DELETE profile, user & posts
// @access Private

router.delete('/',auth, async (req, res) =>{
    try {
        // @todo - remove users posts
        // remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        // remove user
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: "User deleted"})
    } catch (err) {
        console.error(err.message)
        res.send(500).send('Server Error')
    }
})

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private

router.put('/experience', [auth, [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty()

]], async (req, res)=>{
    // @todo allow a previously entered exprience to be updated
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp ={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.experience.unshift(newExp);
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server Error")
    }
});

// @route  Delete api/profile/experience/:exp_id
// @desc   Delete an experience form profile
// @access Private

router.delete('/experience/:exp_id', auth, async (req, res)=>{
    try {
       
        let profile = await Profile.findOne({user: req.user.id});
       
        const filterExperiences = profile.experience.filter(exp => exp.id !== req.params.exp_id)
        profile.experience = filterExperiences;
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})











// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private

router.put('/education', [auth, [
    check('school', 'School is required')
    .not()
    .isEmpty(),
    check('degree', 'Degree is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
    .not()
    .isEmpty()

]], async (req, res)=>{
    // @todo allow a previously entered education to be updated
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const newED ={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.education.unshift(newED);
        await profile.save()
        
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server Error")
    }
});

// @route  Delete api/profile/education/:edu_id
// @desc   Delete an education from profile
// @access Private

router.delete('/education/:edu_id', auth, async (req, res)=>{
    try {
       
        let profile = await Profile.findOne({user: req.user.id});
       
        const filterEducations = profile.education.filter(edu => edu.id !== req.params.edu_id)
        profile.education = filterEducations;
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route  Get api/profile/github/:username
// @desc   Get user repos from GitHub
// @access Public


router.get('/github/:username', async (req, res)=>{
    try {
        const options = {
            uri: encodeURI(
              `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
            ),
            headers: {
              'user-agent': 'node.js',
              Authorization: `token ${config.get('githubToken')}`
            }
          };

          const gitHubResponse = await axios.get(options.uri, options.headers)
          return res.json(gitHubResponse.data);

        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})










module.exports = router;