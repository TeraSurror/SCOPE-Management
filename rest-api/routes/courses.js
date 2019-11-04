const router = require('express').Router();
const Course = require('../models/Course');

// Get List of courses
router.get('/',async (req,res)=>{
    try {
        const posts = await Course.find();
        res.status(200).json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const course = new Course({
        title : req.body.title,
        author : req.body.author,
        skills : req.body.skills ,
        enrollments : [],
    });
    try {
        const savedCourse = await course.save();
        res.json(savedCourse);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:id',async (req,res)=>{
    try{
        const updatedCourse = await Course.updateOne(
            { _id : req.params.id },
            { $push : { enrollments : req.body.name } }
        );
        res.json(updatedCourse);
    }catch(err){
        res.json({message:err});
    }
});



router.delete('/:id',async (req,res)=>{
    try{
        const removedCourse = await Course.remove({_id : req.params.id});
        res.json(removedCourse);
    }catch(err){
        res.json({message : err});
    }
});

module.exports = router;