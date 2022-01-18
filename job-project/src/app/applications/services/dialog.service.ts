import { Injectable } from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ApplicationsPopUpComponent} from "../components/applications-pop-up/applications-pop-up.component";
import {Job} from "../../jobs/models/job.model";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

    constructor(private ngbModalService: NgbModal) { }

    openTaskEditDialog(job?: Job): void {
        if(job){
        const modalOptions: NgbModalOptions = { centered: true, windowClass: 'extraLargeModal', backdrop: 'static' };
        const modalRef: NgbModalRef = this.ngbModalService.open(ApplicationsPopUpComponent, modalOptions);
        modalRef.componentInstance.job = job;
        }
    }

}
