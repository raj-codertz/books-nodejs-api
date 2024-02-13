import { statusCodes } from 'http-status-codes'

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = statusCodes.NOT_FOUND;
    }
}