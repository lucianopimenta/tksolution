// import { throwError } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from '../../core/service/base.service';
import { AlertService } from '../../core/service/alert.service';
import { Professional } from './professional.model';
import { Result } from 'src/app/core/models/result';

@Injectable()
export class ProfessionalService extends BaseService {

    constructor(http: HttpClient, alert: AlertService) { 
        super(http, alert); 
    }

    async get(id: number): Promise<any>{ 
        
        let response = await this.http.get<Result>("professional/" + id).toPromise();
            
        if (response.success) {
            return response.data as Promise<Professional>;
        }
        else {
            this.alert.error(response.errorMessage);
        }
    }

    async getAll(name: string): Promise<any>{ 
        try {
            let httpParams = new HttpParams()
                        .set('name', name);
                        
            let response = await this.http.get<Result>("professional", { params: httpParams }).toPromise();
            
            if (response.success) {
                return response.data as Promise<Professional>;
            }
            else {
                this.alert.error(response.errorMessage);
            }
        } catch (error) {
            this.alert.error(error.message);
        }
        
        return null;
    }

    createNew(): Professional{
        return new Professional();
    }   

    async save(entidade: Professional): Promise<Result>{

        if(entidade.Code == 0){
            return await this.http.post("professional", entidade).toPromise() as Result;
        } else {
            return await this.http.put("professional", entidade).toPromise() as Result;
        }
    }

    async removeSelected(status: number, codes: Array<number>): Promise<Result> {

        return await this.http.put("professional/deleteRange/", { Codes: codes, Status: status }).toPromise() as Result;        
    }
}