import { BaseService } from 'src/app/core/service/base.service';
import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/core/service/alert.service';
import { HttpClient } from '@angular/common/http';
import { DashBoard } from './dash-analytics.model';
import { Result } from 'src/app/core/models/result';

@Injectable()
export class DashBoardService extends BaseService {

    constructor(http: HttpClient, alert: AlertService) { 
        super(http, alert); 
    }

    async getPanel(): Promise<DashBoard>{ 
        
        let response = await this.http.get<Result>("dashboard/panel").toPromise();
            
        if (response.success) {
            return response.data as Promise<DashBoard>;
        }
        else {
            this.alert.error(response.errorMessage);
        }
    }

    async getCharts(status: number){ 
        
        let response = await this.http.get<Result>("dashboard/chartforcity/" + status).toPromise();
            
        if (response.success) {
            return response.data;
        }
        else {
            this.alert.error(response.errorMessage);
        }
    }
    
    
}