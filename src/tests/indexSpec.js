"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('suite description', () => {
    it('expect myFunc(5) to equal 25', () => {
        expect((0, index_1.myFunc)(855)).toEqual(25);
    });
});
