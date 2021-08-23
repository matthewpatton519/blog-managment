import { Injectable } from '@nestjs/common';
import * as moment from "moment";


@Injectable()
export class GeneralHelperService {

    static ApiResponse(code: number, msg: string, data: any) {
        if (data != null || data != undefined) {
            return { responseCode: code, responseMessage: msg, responseData: data };
        }
        return { responseCode: code, responseMessage: msg };
    }

    static getDateTime(date: any) {
        var createdAt = moment(date).format('YYYY/MM/DD hh:mm A');
        return createdAt;
    }

    static isRequired(data: any) {
        if (typeof data == "string" && data.trim().length == 0)
            return true;
        if (typeof data == "number" && data == 0)
            return false;
        return (data == '' || data == 'undefined' || data == null) ? true : false;

    }

}