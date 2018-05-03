const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');

const app = require('../../app');

const generateRandomUrl = (domain) => {
    return `http://${domain}/${Math.random()}`;
};


describe('Video routes', () => {

    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    describe('POST /videos', () => {
        it('saves a Video document', async () => {
            const newVideo = {
                title: 'Best title ever',
                description: 'This is the greatest cat video of all time!!!',
                url: 'https://www.youtube.com/watch?v=xyJZH2UPifo'
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            const videoFromDatabase = await Video.findOne({});
            assert.equal(videoFromDatabase.title, newVideo.title);
            assert.equal(videoFromDatabase.description, newVideo.description);
            assert.equal(videoFromDatabase.url, newVideo.url);
        });

        it('should not save without title', async () => {
            const newVideo = {
                description: 'This is the greatest cat video of all time!!!'
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            const videos = await Video.find({});

            assert.equal(videos.length, 0);
        });

        it('should return 400 without title', async () => {
            const newVideo = {
                description: 'This is the greatest cat video of all time!!!'
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.equal(response.status, 400);
        });

        it('should render create page without title', async () => {
            const newVideo = {
                description: 'This is the greatest cat video of all time!!!'
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, 'form');
        });

        it('should render error message without title', async () => {
            const newVideo = {
                description: 'This is the greatest cat video of all time!!!'
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, 'Path &#x60;title&#x60; is required');
        });

        it('should render error message without URL', async () => {
            const newVideo = {
                title: 'A valid error render title for a video',
                description: 'This is the greatest cat video of all time!!!'
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, 'Path &#x60;url&#x60; is required');
        });

        it('should render rest of video item without title', async () => {
            const newVideo = {
                description: 'This is the greatest cat video of all time!!!',
                url: generateRandomUrl('youtube.com')
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, newVideo.description);
            assert.include(response.text, newVideo.url);
        });
    });

    describe('GET /videos', () => {
        it('/videos/:id renders the Video', async () => {
            const newVideo = {
                title: 'Best get /videos/:id title ever',
                description: 'This is the greatest cat video of all time!!!',
                url: generateRandomUrl('youtube.com')
            };

            const sendReponse = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            const video = await Video.findOne({});

            const getResponse = await request(app)
                .get(`/videos/${video._id}`);

            assert.include(getResponse.text, newVideo.url);
            assert.include(getResponse.text, video._doc.title);
        });
    });
});