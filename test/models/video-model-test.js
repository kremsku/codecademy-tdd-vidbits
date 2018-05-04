const { assert } = require('chai');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');

beforeEach(connectDatabase);
afterEach(disconnectDatabase);

describe('Video model', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('new Video with model', () => {
    it('should have a string title', async () => {
      const newVideo = {
        title: 25,
        description: "This is the greatest cat video of all time!!!"
      }

      const video = new Video(newVideo);
      const errors = video.validateSync();
      assert.strictEqual(video.title, newVideo.title.toString());

    });

    it('should have a string url', async () => {
      const newVideo = {
        title: 25,
        description: "This is the greatest cat video of all time!!!",
        url: false
      }

      const video = new Video(newVideo);
      assert.strictEqual(video.url, newVideo.url.toString());

    });

    it('should have a mandatory url', async () => {
      const newVideo = {
        title: 25,
        description: "This is the greatest cat video of all time!!!"
      }

      const video = new Video(newVideo);
      const errors = video.validateSync();

      assert.equal(video.errors.url.message, 'a URL is required');
    });

  });
}); 