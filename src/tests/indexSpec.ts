import supertest from 'supertest';
import app from '../index';
import { checkImageExist } from '../utils';

const request = supertest(app);

describe('Test endpoint responses', async () => {
    it('Expect the valid url should be return response code 200', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=200&height=500'
        );
        expect(response.status).toBe(200);
    });
    it('Expect the invalid url should be return response code 400', async () => {
        const response = await request.get('/api/images?filename=fjor');
        expect(response.status).toBe(400);
    });
});

describe('Image transform function should resolve or reject', () => {
    it('Expect transformation is success', async () => {
        const THUMB_FILE_NAME = 'fjord_h500_w200.jpg';
        await request.get('/api/images?filename=fjord&width=200&height=500');
        expect(
            checkImageExist({
                filename: THUMB_FILE_NAME,
                isCheckingThumb: true,
            })
        ).toBeTruthy();
    });

    it('Expect check if nothing.jpg in thumbs folder and return false', () => {
        const thumbFileName = 'nothing';
        const isFileExisted = checkImageExist({
            filename: thumbFileName,
            isCheckingThumb: true,
        });
        expect(isFileExisted).toBeFalsy();
    });
});
