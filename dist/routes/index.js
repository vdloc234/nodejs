"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const route = express_1.default.Router();
exports.route = route;
route.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        res.status(400).send(`${constants_1.ErrorMessage.PREFIX}: ${constants_1.ErrorMessage.MISSING_INPUT_FILE}`);
        return;
    }
    if (!(0, utils_1.checkImageExist)({ filename: `${filename}.jpg` })) {
        res.status(400).send(`${constants_1.ErrorMessage.PREFIX}: ${constants_1.ErrorMessage.NOT_FOUND}`);
        return;
    }
    const thumbFileName = (0, utils_1.createThumbnailFileName)({ filename, width, height });
    const thumbFilePath = path_1.default.join(constants_1.THUMBNAILS_PATH, thumbFileName);
    const isThumbnailFileExisted = (0, utils_1.checkImageExist)({
        filename: thumbFileName,
        isCheckingThumb: true,
    });
    if (isThumbnailFileExisted) {
        return res.status(200).sendFile(thumbFilePath);
    }
    try {
        const imagePath = path_1.default.join(constants_1.ROOT_IMAGES_PATH, `${filename}.jpg`);
        const originalImage = yield (0, promises_1.readFile)(imagePath);
        yield (0, sharp_1.default)(originalImage)
            .resize(Number(width), Number(height))
            .toFile(thumbFilePath);
        res.set('Content-Type', 'image/jpeg');
        return res.status(200).sendFile(thumbFilePath);
    }
    catch (err) {
        throw new Error(err);
    }
}));
