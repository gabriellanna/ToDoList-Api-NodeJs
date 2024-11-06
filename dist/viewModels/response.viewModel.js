"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseViewModel = void 0;
class ResponseViewModel {
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}
exports.ResponseViewModel = ResponseViewModel;
