import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Job} from "../../../jobs/models/job.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-applications-pop-up',
  templateUrl: './applications-pop-up.component.html',
  styleUrls: ['./applications-pop-up.component.scss']
})
export class ApplicationsPopUpComponent implements OnInit {

    @Input() job!: Job;



    codemirrorConfig = {lineNumbers: true, mode: {name: 'handlebars', base: 'text/html'}};
    @ViewChild('editor') editor: any;


    constructor(private activeModal: NgbActiveModal, private router: Router) {

    }

    ngOnInit() {

    }


    close(): void {
        this.router.navigate(['/home']);
        this.activeModal.close();

    }

}

