import { IResponse } from "../types/response.js";

export function makeResponse(msg: string, data: any | null = null, token: string | null = null) {
    const response: IResponse = {
        msg: msg,
        data: data,
        token: token,
    };

    return response;
}
