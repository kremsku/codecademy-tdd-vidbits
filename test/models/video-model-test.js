const { assert } = require('chai');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');

beforeEach(connectDatabase);
afterEach(disconnectDatabase);

describe('Video model test', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('Video model test', () => {
    it('should have a string title', async () => {
      const newVideo = {
        title: 25,
        description: "This is the greatest cat video of all time!!!"
      }

      const video = new Video(newVideo);
      const errors = video.validateSync();
      // console.log('\n');
      // console.log('\n');
      // console.log("errors: ", errors);
      // console.log('\n');
      // console.log('\n');
      assert.strictEqual(video.title, newVideo.title.toString());

    });

    it('#url is a String', async () => {
      const newVideo = {
        title: 25,
        description: "This is the greatest cat video of all time!!!",
        url: false
      }

      const video = new Video(newVideo);
      assert.strictEqual(video.url, newVideo.url.toString());

    });

    it('#url is required', async () => {
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