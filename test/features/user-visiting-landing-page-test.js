const { assert } = require('chai');

describe('User visits landing page', () => {
  describe('without existing items', () => {
    it('should have no videos', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  describe('can navigate', () => {
    it('to the create page', async () => {
      // Setup
      browser.url('/videos');
      // Exercise
      browser.click('a[href="/videos/create"]');
      // Verification
      assert.include(browser.getText('body'), 'Save a video');
    });
  });
  describe('WITH existing items', () => {
    it('should render existing videos', async () => {

      const newVideo = {
        title: "Best index-test title ever...",
        description: "This is the greatest cat video of all time!!!"
      };
      browser.url('/videos/create');

      browser.setValue('#title-input', newVideo.title);
      browser.setValue('#description-input', newVideo.description);
      browser.click('#submit-button');

      browser.url('/');
      // assert.equal(browser.getUrl(), '/');
      assert.include(browser.getText('body'), newVideo.title);
    });
  });
});