import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../theme/shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MomentModule
  ]
})
export class PagesModule { }
