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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const utils_1 = require("../utils");
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => __awaiter(void 0, void 0, void 0, function* () {
    it('Expect the valid url should be return response code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=200&height=500');
        expect(response.status).toBe(200);
    }));
    it('Expect the invalid url should be return response code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjor');
        expect(response.status).toBe(400);
    }));
}));
describe('Image transform function should resolve or reject', () => {
    it('Expect transformation is success', () => __awaiter(void 0, void 0, void 0, function* () {
        const THUMB_FILE_NAME = 'fjord_h500_w200.jpg';
        yield request.get('/api/images?filename=fjord&width=200&height=500');
        expect((0, utils_1.checkImageExist)({
            filename: THUMB_FILE_NAME,
            isCheckingThumb: true,
        })).toBeTruthy();
    }));
    it('Expect check if nothing.jpg in thumbs folder and return false', () => {
        const thumbFileName = 'nothing';
        const isFileExisted = (0, utils_1.checkImageExist)({
            filename: thumbFileName,
            isCheckingThumb: true,
        });
        expect(isFileExisted).toBeFalsy();
    });
});
