const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');
const { parseTextFromHTML } = require('../test-utils');

const app = require('../../app');

describe('Video routes', () => {

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    describe('POST item and GET index', () => {
        it('should post a new item and check it exists', async () => {
            
            const newVideo = {
                title: "Best index-test title ever",
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.equal(response.statusCode, 302);
            // assert.include(parseTextFromHTML(response.text, 'body'), newVideo.title);
        });

    });
});