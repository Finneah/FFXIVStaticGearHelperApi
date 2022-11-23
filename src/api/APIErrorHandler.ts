import { Response } from 'express';

export enum ErrorCodes {
    UNKNOWN,
    MISSING_PARAM,
    STATIC_EXIST,
    ETRO_GET_GEARSET,
    ETRO_GET_MATERIA,
    ETRO_GET_JOBS,
    PERMISSION_DENIED,
    NOT_FOUND
}
export type ErrorType = {
    api: string;
    status: number;
    code: ErrorCodes;
    message: string;
};

class APIErrorHandler {
    declare error: ErrorType;
    declare apiName: string;
    declare code: ErrorCodes;
    declare status: number;
    declare message: string;
    constructor(routeName: string) {
        this.apiName = routeName;
    }
    async handleError(res: Response) {
        const error: ErrorType = {
            api: this.apiName,
            status: this.status,
            code: this.code,
            message: this.message
        };
        res.status(this.status).json(error);
    }
    setError(
        errorCode: ErrorCodes,
        errorMessage: string,
        errorStatus?: number
    ) {
        this.code = errorCode;
        this.status = errorStatus || 400;
        this.message = errorMessage;
    }
    setCode(errorCode: ErrorCodes) {
        this.code = errorCode;
    }
    setStatus(errorStatus: number) {
        this.status = errorStatus;
    }
    setMessage(errorMessage: string) {
        this.message = errorMessage;
    }
}

export default APIErrorHandler;
