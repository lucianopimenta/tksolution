import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {AlertService } from '../service/alert.service';

export class BaseComponent<Server> implements OnInit {
    public service = null;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        public _service: Server,
        public _alertService: AlertService
    ) {
        this.service = _service;
    }

    ngOnInit() {
    }

    compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}