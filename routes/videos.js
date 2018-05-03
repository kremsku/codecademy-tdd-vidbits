
const router = require('express').Router();
const Video = require('../models/video');
const {mongoose} = require('../database');

router.get('/', async (req, res, next) => {
  res.status(302).redirect('videos');
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.status(200).render('index', {videos: videos});
});

router.get('/videos/create', async (req, res, next) => {
  res.status(200).render('create', {newItem: {}});
});

router.get('/videos/:id', async (req, res, next) => {
  videoId = req.params.id;

  if (mongoose.Types.ObjectId.isValid(videoId)) {
    const video = await Video.findOne({_id: videoId});
    res.status(200).render('show', {video: video});
  } else {
    console.log("NOT A VALID OBJECTID: ", videoId);
    res.status(200).render('index');
  }
  
});

router.post('/videos', async (req, res, next) => {
  const {title, description, url} = req.body;
  const newItem = new Video({title, description, url});
  newItem.validateSync();
  if (newItem.errors) {
    // console.log("newItem.errors: ", newItem.errors);
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.status(301).redirect(`videos/${newItem._id}`);
  }

});

module.exports = router;
