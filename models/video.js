const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      required: true,
      type: String
    },
    description: String
  })
);

module.exports = Video;
