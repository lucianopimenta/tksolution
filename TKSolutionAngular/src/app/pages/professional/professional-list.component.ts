import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectSubscription } from 'rxjs/internal-compatibility';
import { BaseComponent } from 'src/app/core/helper/base.component';
import { ConfirmDialogService } from 'src/app/theme/shared/components/confirm-dialog/confirm-dialog.service';
import { AlertService } from '../../core/service/alert.service';
import { Professional } from './professional.model';
import { ProfessionalService } from './professional.service';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent extends BaseComponent<ProfessionalService> {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource = new MatTableDataSource<Professional>();
  public columnsData = ['Name', 'CPF', 'TypeClassDescription', 'StatusDescription', 'Selected'];
  public nameInput: string = '';

  constructor(public _route: ActivatedRoute, 
    public _router: Router,
    public _service: ProfessionalService, 
    public _alert: AlertService, 
    private spinnerService: NgxSpinnerService,
    private dialogService: ConfirmDialogService) { 
      super(_route, _router, _service, _alert);
    }

  ngOnInit(): void {
    this.load();
  }

  onNew(){
    this._router.navigate(['/pages/professional/new']);
  }

  load(){

    this.spinnerService.show();

    this._service.getAll(this.nameInput).then( result =>{
      
      this.dataSource = new MatTableDataSource<Professional>(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
      this.spinnerService.hide();
    })

  }

  removeSelected(){
    this.spinnerService.show();
    let codes = new Array<number>();

    this.dataSource.data.forEach(d => {
        if (d.Selected)
          codes.push(d.Code);
    });

    this._service.removeSelected(2, codes).then(result =>{
      if (result.success){
        this._alert.success("Itens removidos com sucesso.");
        this.load();
      }
      else
        this._alert.error(result.errorMessage);

      this.spinnerService.hide();
    });

  }

  selectedAll(event: MatCheckboxChange){
    this.dataSource.data.forEach(d => {
      d.Selected = event.checked;
    })
  }
}
