
const router = require('express').Router();
const Video = require('../models/video');
const { mongoose } = require('../database');

router.get('/', (req, res) => {
  res.status(302).redirect('videos');
});

router.post('/videos/:id/deletions', async (req, res) => {
  const videoId = req.params.id

  if (!videoId) {
    res.status(400).render('edit', { video: {} });
  } else {
    const deletedVideo = await Video.findOneAndRemove({ _id: videoId }, { remove: true });
    if (deletedVideo.result.ok === 1) {
      res.status(302).redirect('/');
    } else {
      res.status(400).render('/videos');
    }
  }

});

router.get('/videos', async (req, res) => {
  const videos = await Video.find({});
  res.status(200).render('index', { videos: videos });
});

router.get('/videos/create', (req, res) => {
  res.status(200).render('create', { newItem: {} });
});


router.get('/videos/:id', async (req, res) => {
  const videoId = req.params.id
  if (mongoose.Types.ObjectId.isValid(videoId)) {
    const video = await Video.findOne({ _id: videoId });
    res.status(200).render('show', { video: video });
  } else {
    res.status(200).render('index');
  }
});

router.get('/videos/:id/edit', async (req, res) => {
  const videoId = req.params.id

  const video = await Video.findOne({ _id: videoId });
  res.status(200).render('edit', { video: video });
});


router.post('/videos', async (req, res) => {
  const { title, description, url } = req.body;
  const newItem = new Video({ title, description, url });
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', { newItem: newItem });
  } else {
    await newItem.save();
    res.status(301).redirect(`videos/${newItem._id}`);
  }
});

router.post('/updates', async (req, res) => {
  const { title, description, url, videoid } = req.body;

  if (!videoid) {
    res.status(400).render('edit', { video: {} });
  } else {
    const video = new Video({ title, description, url });
    video.validateSync();
    if (video.errors) {
      res.status(400).render('edit', { video: video });
    } else {

      const updatedVideo = await Video.findByIdAndUpdate(videoid, { $set: { title: title, description: description, url: url } }, { new: true });

      res.status(302).redirect(`videos/${videoid}`);
    }
  }

});

module.exports = router;
