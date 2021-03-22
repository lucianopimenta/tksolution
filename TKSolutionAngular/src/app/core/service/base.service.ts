import { HttpClient } from "@angular/common/http";
import { AlertService } from "../service/alert.service";

export abstract class BaseService {
    constructor(
        protected http: HttpClient,
        protected alert: AlertService
    ) { }

    // Converte as Datas que vem como string do servidor e o maldito angular não converte sozinho!!
    public parse(json) {
        Object.keys(json).map(key => {
            var value = json[key];
            if (typeof value == 'string') {
                const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                if (match) {
                    json[key] = new Date(value);;
                }
            }
        });
        return json;
    }     
}