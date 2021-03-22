import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from '../service/alert.service';

export class BaseRegister<Server, Entidade> implements OnInit {
    public nameClass: string;
    public edit: boolean = false;
    public entity = null;
    public service = null;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        public _service: Server,
        public _alert: AlertService,
        public _entity: new () => Entidade
    ) {
        this.service = _service;
        this.entity = _entity;
    }

    ngOnInit() {
        let code = this._route.snapshot.paramMap.get("id");

        this.onGet(Number(code));
    }

    onGet(code: number) {

        if (code == 0) {
            this.edit = false;
            this.entity = this.service.createNew();
        } else {
            this.edit = true;
            this.service.get(code).then(result => {
                this.entity = result;
            },
                error => {
                    this._alert.error(<any>error);
                });
        }
    }

    onBack(): void {
        this._router.navigate(['/' + this.nameClass]);
    }
}
