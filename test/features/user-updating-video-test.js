const {assert} = require('chai');

describe('User updating video', () => {
    describe('editing a video', () => {
      it('changes the values', () => {
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

        browser.click('#edit');

        const newTitle = 'A new, edited, title!';
        browser.setValue('#title-input', newTitle);

        browser.click('#submit-button');

        assert.include(browser.getText('body'), newTitle);
      });

      it('does not create a new video', () => {
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

        browser.click('#edit');

        const newTitle = 'A new, edited, title!';
        browser.setValue('#title-input', newTitle);

        browser.click('#submit-button');

        assert.notInclude(browser.getText('body'), newVideo.title);
        assert.include(browser.getText('body'), newTitle);
      });
    });
  });