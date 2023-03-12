import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { ErrorMessage, ROOT_IMAGES_PATH, THUMBNAILS_PATH } from '../constants';
import { checkImageExist, createThumbnailFileName } from '../utils';

const route = express.Router();

interface IQueryParams {
    filename?: string;
    width?: number;
    height?: number;
}

route.get('/images', async (req: express.Request, res: express.Response) => {
    const { filename, width, height }: IQueryParams = req.query;

    if (!filename || !width || !height) {
        res.status(400).send(
            `${ErrorMessage.PREFIX}: ${ErrorMessage.MISSING_INPUT_FILE}`
        );
        return;
    }

    if (!checkImageExist({ filename: `${filename}.jpg` })) {
        res.status(400).send(
            `${ErrorMessage.PREFIX}: ${ErrorMessage.NOT_FOUND}`
        );
        return;
    }

    const thumbFileName = createThumbnailFileName({ filename, width, height });
    const thumbFilePath = path.join(THUMBNAILS_PATH, thumbFileName);

    const isThumbnailFileExisted = checkImageExist({
        filename: thumbFileName,
        isCheckingThumb: true,
    });

    if (isThumbnailFileExisted) {
        return res.status(200).sendFile(thumbFilePath);
    }

    try {
        const imagePath = path.join(ROOT_IMAGES_PATH, `${filename}.jpg`);
        const originalImage = await readFile(imagePath);
        await sharp(originalImage)
            .resize(Number(width), Number(height))
            .toFile(thumbFilePath);

        res.set('Content-Type', 'image/jpeg');
        return res.status(200).sendFile(thumbFilePath);
    } catch (err) {
        throw new Error(err as string);
    }
});

export { route };
