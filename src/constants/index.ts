import path from 'path';

export const ErrorMessage = {
    PREFIX: 'The following error occured processing your image remedy and try again',
    MISSING_INPUT_FILE: 'Input file is missing!',
    NOT_FOUND: 'Image with provided information is not found!',
};

export const ROOT_IMAGES_PATH = path.join(
    __dirname,
    '..',
    'images',
    'fullsize'
);

export const THUMBNAILS_PATH = path.join(__dirname, '..', 'images', 'thumbs');
