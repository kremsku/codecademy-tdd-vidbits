const {assert} = require('chai');

describe('User deletes video', () => {
    describe('deleting video', () => {
      it('should go to video page and delete it', () => {
        const newVideo = {
            title: "This is the greatest cat video of all time!!!",
            description: "Wow, such description. Much information.",
            url: "https://www.youtube.com/embed/7GSgWzmR_"
        };
        browser.url('/videos/create');
        
        browser.setValue('#title-input', newVideo.title);
        browser.setValue('#description-input', newVideo.description);
        browser.setValue('#url-input', newVideo.url);
        browser.click('#submit-button');

        browser.click('#delete');

        assert.notInclude(browser.getText('body'), newVideo.title);
      });
    });
  });