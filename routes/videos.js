
const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.status(302).redirect('videos');
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.status(200).render('index', {videos: videos});
});

router.get('/videos/:id', async (req, res, next) => {
  console.log("req.params: ", req.params);
  videoId = req.params.id;
  const video = await Video.find({_id: videoId});
  res.status(200).render('show', {video: video});
});

router.get('/videos/create', async (req, res, next) => {
  res.status(200).render('create', {newItem: {}});
});

router.post('/videos', async (req, res, next) => {
  const {title, description} = req.body;
  const newItem = new Video({title, description});
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
