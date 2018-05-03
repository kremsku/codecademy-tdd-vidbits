const { assert } = require('chai');

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

const clickLink = (selector) => {
  browser.click(selector);
};

const setValue = (selector, value) => {
  browser.setValue(selector, value);
}

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
      clickLink('a[href="/videos/create"]');
      // Verification
      assert.include(browser.getText('body'), 'Save a video');
    });
  });
  describe('WITH existing video', () => {
    it('should render existing videos', async () => {

      const newVideo = {
        title: "Best index-test title ever...",
        description: "This is the greatest cat video of all time!!!",
        url: generateRandomUrl('youtube.com')
      };
      browser.url('/videos/create');

      setValue('#title-input', newVideo.title);
      setValue('#description-input', newVideo.description);
      setValue('#url-input', newVideo.url);
      clickLink('#submit-button');

      browser.url('/');
      // console.log("browser.getSource(): ", browser.getSource());
      assert.include(browser.getText('body'), newVideo.title);
    });

    it('should have iframe with video url', async () => {
      const newVideo = {
        title: "Best iframe-url title ever...",
        description: "Just a description",
        url: generateRandomUrl('youtube.com')
      };
      browser.url('/videos/create');

      setValue('#title-input', newVideo.title);
      setValue('#description-input', newVideo.description);
      setValue('#url-input', newVideo.url);
      clickLink('#submit-button');

      browser.url('/');
      // console.log("browser.getSource(): ", browser.getSource());
      var iframe = browser.getHTML('iframe');
      assert.include(iframe, newVideo.url);
    });

    it('can navigate to video page', async () => {
      const newVideo = {
        title: "Best clickable title ever...",
        description: "Just a description",
        url: generateRandomUrl('youtube.com')
      };
      browser.url('/videos/create');

      setValue('#title-input', newVideo.title);
      setValue('#description-input', newVideo.description);
      setValue('#url-input', newVideo.url);
      clickLink('#submit-button');

      clickLink('.video-title');
      // console.log("browser.getSource(): ", browser.getSource());
      const title = browser.getText('.video-title');

      assert.include(browser.getUrl(), 'http://localhost:8001/videos/');
      assert.equal(title, newVideo.title);
    });
  });
});