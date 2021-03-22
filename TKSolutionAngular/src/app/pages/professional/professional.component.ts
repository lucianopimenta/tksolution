import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseRegister } from 'src/app/core/helper/base.register';
import { Item } from 'src/app/core/models/item';
import { AlertService } from 'src/app/core/service/alert.service';
import { Professional } from './professional.model';
import { ProfessionalService } from './professional.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent extends BaseRegister<ProfessionalService, Professional> {

  registerForm: FormGroup;
  public dataTypeClassDocument: Array<Item> = [
    { Value: 1, Text: "ABD" },
    { Value: 2, Text: "CREA" },
    { Value: 3, Text: "CAU" }
  ]

  constructor(public _route: ActivatedRoute, 
    public _router: Router,
    public _service: ProfessionalService, 
    private formBuilder: FormBuilder,
    public _alert: AlertService, 
    private spinnerService: NgxSpinnerService) { 
    super(_route, _router, _service, _alert, Professional);
    this.nameClass = "pages/professional";
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      CPF: ['', Validators.required],
      TypeClassDocument: ['', Validators.required],
      TypeNumber: ['', Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit(){
    this.spinnerService.show();
  
    if (this.registerForm.invalid) {
      this.spinnerService.hide();
      return;
    }

    if (!this.edit) {
      this.entity.Code = 0;
    }

    //salva
    this._service.save(this.entity).then(result => {
      if (result.success){
        this._alert.success("Registro salvo com sucesso.");
        this.onBack();
      }
      else
        this._alert.error(result.errorMessage);

      this.spinnerService.hide();
    });
  }

}
