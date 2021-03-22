import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashAnalyticsRoutingModule } from './dash-analytics-routing.module';
import { DashAnalyticsComponent } from './dash-analytics.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { DashBoardService } from './dash-analytics.service';


@NgModule({
  imports: [
    CommonModule,
    DashAnalyticsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbTabsetModule    
  ],
  declarations: [
    DashAnalyticsComponent,
  ],
  providers:[
    DashBoardService
  ]
})
export class DashAnalyticsModule { }
