import { IResponse } from "../controllers/authControllers.js";

function setErrorDetails(msg: string, err: string): IResponse {
    let response: IResponse = {
        msg: msg,
        err: err,
    };

    return response;
}

export { setErrorDetails };
