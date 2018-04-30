const { assert } = require('chai');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');

beforeEach(connectDatabase);
afterEach(disconnectDatabase);

describe('Video test', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('Video model test', () => {
    it('should have a string title', async () => {
      const newVideo = {
        title: 25,
        description: "This is the greatest cat video of all time!!!"
      }

      const video = new Video(newVideo);
      assert.strictEqual(video.title, newVideo.title.toString());

    });

    // it('renders all items from the database', async () => {
    // });
  });
}); 