import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { ProfessionalComponent } from './professional.component';
import { ProfessionalListComponent } from './professional-list.component';
import { ProfessionalService } from './professional.service';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
    imports: [
      FormsModule, 
      ReactiveFormsModule, 
      RouterModule.forChild([
        { path: '', component: ProfessionalListComponent },
        { path: 'edit/:id', component: ProfessionalComponent },
        { path: 'new', component: ProfessionalComponent },
      ]), 
      CommonModule, 
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatTableModule,      
      MatSelectModule,
      MatIconModule,
      MatSortModule,
      MatTabsModule,     
      MatTooltipModule,
      MatCheckboxModule,
      MatDividerModule,
      MatExpansionModule,
      MatPaginatorModule,
      MatRadioModule,
      NgxMaskModule.forRoot(maskConfig),
    ],
    declarations: [
      ProfessionalComponent, ProfessionalListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
      ProfessionalService
    ]
  })
  export class ProfessionalModule { }