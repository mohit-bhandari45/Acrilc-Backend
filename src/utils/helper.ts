import { IResponse } from "../controllers/auth.js";

function setErrorDetails(msg: string, err: string): IResponse {
    let response: IResponse = {
        msg: msg,
        err: err,
    };

    return response;
}

export { setErrorDetails };