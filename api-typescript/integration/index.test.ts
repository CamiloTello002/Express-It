import { Express } from 'express';
import request from 'supertest';
import { createApp } from '../src/createApp';
import TestAgent from 'supertest/lib/agent';

describe('/api/users', () => {
    let app: Express;
    
    beforeAll(() => {
        app = createApp();
    });

    it('should return an empty array when getting /api/users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.body).toStrictEqual([]);
    })
})