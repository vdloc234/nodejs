"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.THUMBNAILS_PATH = exports.ROOT_IMAGES_PATH = exports.ErrorMessage = void 0;
const path_1 = __importDefault(require("path"));
exports.ErrorMessage = {
    PREFIX: 'The following error occured processing your image remedy and try again',
    MISSING_INPUT_FILE: 'Input file is missing!',
    NOT_FOUND: 'Image with provided information is not found!',
};
exports.ROOT_IMAGES_PATH = path_1.default.join(__dirname, '..', 'images', 'fullsize');
exports.THUMBNAILS_PATH = path_1.default.join(__dirname, '..', 'images', 'thumbs');
