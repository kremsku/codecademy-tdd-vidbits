const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');
const { parseTextFromHTML } = require('../test-utils');

const app = require('../../app');

describe('Index routes', () => {

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    describe('POST a new item and GET index', () => {
        it('should post a new item and get redirected to video detail page', async () => {
            
            const newVideo = {
                title: "Best index-test title ever",
                description: "This is the greatest cat video of all time!!!",
                url: "someUrl.com"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.equal(response.statusCode, 302);
            assert.include(response.headers.location, 'videos/');
        });

    });
});