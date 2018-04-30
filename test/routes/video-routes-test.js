const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');
const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const Video = require('../../models/video');

const app = require('../../app');

describe('Video routes', () => {

    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    // describe('POST to /videos', () => {
    //     it('should return 201', async () => {
    //         const response = await request(app)
    //             .post('/videos')
    //             .send();

    //         assert.equal(response.status, 201);
    //     });
    // });
    describe('POST /videos', () => {
        it('posts a new video title and description', async () => {
            const newVideo = {
                title: "Best title ever",
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            const videoFromDatabase = await Video.findOne({});
            // console.log("videoFromDatabase: ", videoFromDatabase);
            assert.equal(videoFromDatabase.title, newVideo.title);
            assert.equal(videoFromDatabase.description, newVideo.description);
        });

        it('should return the video details', async () => {
            const newVideo = {
                title: "Best title ever",
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            // console.log("response.body: ", response.body);
            assert.equal(response.body.title, newVideo.title);
            assert.equal(response.body.description, newVideo.description);
        });

        it('should not save without title', async () => {
            const newVideo = {
                description: "This is the greatest cat video of all time!!!"
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
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.equal(response.status, 400);
        });

        it('should render create page without title', async () => {
            const newVideo = {
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, 'form');
        });

        it('should render error message without title', async () => {
            const newVideo = {
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, 'Path &#x60;title&#x60; is required');
        });

        it('should render rest of video item without title', async () => {
            const newVideo = {
                description: "This is the greatest cat video of all time!!!"
            }
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            assert.include(response.text, newVideo.description);
        });
    });

    describe('GET /videos', () => {
        it('/videos/:id renders the Video', async () => {
            const newVideo = {
                title: "Best title ever",
                description: "This is the greatest cat video of all time!!!"
            };

            const response1 = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            const video = await Video.findOne({});
            console.log("video: ", video);
            const response = await request(app)
                .get(`/videos/${video._id}`);
            
            // assert.include(response.text, video.title);
        });
    });
});