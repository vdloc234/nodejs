"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImageExist = exports.createThumbnailFileName = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const createThumbnailFileName = ({ filename, width, height, extension = 'jpg', }) => `${filename}_h${height}_w${width}.${extension}`;
exports.createThumbnailFileName = createThumbnailFileName;
const checkImageExist = ({ filename, isCheckingThumb = false, }) => {
    const prefixPath = isCheckingThumb ? constants_1.THUMBNAILS_PATH : constants_1.ROOT_IMAGES_PATH;
    const filePath = path_1.default.join(prefixPath, filename);
    return (0, fs_1.existsSync)(filePath);
};
exports.checkImageExist = checkImageExist;
exports.default = {};
