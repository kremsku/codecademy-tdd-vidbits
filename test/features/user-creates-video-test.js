const {assert} = require('chai');

describe('User visits create a video page', () => {
    describe('creating a new video', () => {
      it('should fill out and submit form', () => {
        const newVideo = {
            title: "This is the greatest cat video of all time!!!",
            description: "Wow, such description. Much information.",
            url: "https://nba.com/"
        };
        browser.url('/videos/create');
        
        browser.setValue('#title-input', newVideo.title);
        browser.setValue('#description-input', newVideo.description);
        browser.setValue('#url-input', newVideo.url);
        browser.click('#submit-button');

        browser.url('/');
        assert.include(browser.getText('body'), newVideo.title);
        // assert.include(browser.getText('body'), newVideo.description);
      });
    });
  });