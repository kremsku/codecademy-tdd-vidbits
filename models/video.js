const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      required: true,
      type: String
    },
    description: String,
    url: {
      required: [true, 'a URL is required'],
      type: String
    }
  })
);

module.exports = Video;
