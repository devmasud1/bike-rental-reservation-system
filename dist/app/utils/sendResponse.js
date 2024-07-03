"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const response = {
        success: data === null || data === void 0 ? void 0 : data.success,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        message: data === null || data === void 0 ? void 0 : data.message,
        token: data === null || data === void 0 ? void 0 : data.token,
        data: data === null || data === void 0 ? void 0 : data.data,
    };
    if (data === null || data === void 0 ? void 0 : data.success) {
        response.statusCode = data === null || data === void 0 ? void 0 : data.statusCode;
    }
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(response);
};
exports.default = sendResponse;
