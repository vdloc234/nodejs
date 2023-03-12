import { existsSync } from 'fs';
import path from 'path';
import { ROOT_IMAGES_PATH, THUMBNAILS_PATH } from '../constants';

export const createThumbnailFileName = ({
    filename,
    width,
    height,
    extension = 'jpg',
}: {
    filename: string;
    width: number;
    height: number;
    extension?: string;
}): string => `${filename}_h${height}_w${width}.${extension}`;

export const checkImageExist = ({
    filename,
    isCheckingThumb = false,
}: {
    filename: string;
    isCheckingThumb?: boolean;
    extension?: string;
}): boolean => {
    const prefixPath = isCheckingThumb ? THUMBNAILS_PATH : ROOT_IMAGES_PATH;
    const filePath = path.join(prefixPath, filename);

    return existsSync(filePath);
};

export default {};
