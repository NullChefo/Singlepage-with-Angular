import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from "../../models/job.model";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user.model";
import {JobsService} from "../../services/jobs.service";
import {DialogService} from "../../../applications/services/dialog.service";

@Component({
    selector: 'app-job-item',
    templateUrl: './job-item.component.html',
    styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {


    @Input() job!: Job;

    @Input() adminControl: boolean = false ;


    @Output() refresh = new EventEmitter<boolean>();

    @Output() deleteClicked = new EventEmitter<number>();

    applied: boolean = false;

    hasPermissions: boolean = false;

    isApplyAccepted: boolean = false;

    constructor(private authService: AuthService, private jobService: JobsService, private dialogService: DialogService) {
    }

    ngOnInit(): void {


        let user: User = this.authService.getLoggedUser();

        this.hasPermissions = this.job.creatorId == user.id;

        this.applied = this.jobService.isApplied(this.job);

        this.isApplyAccepted = this.jobService.checkIfAccepted(this.job);


    }

    onDelete(): void {
        this.deleteClicked.emit(this.job?.id);
    }

    applyForJob() {

        this.jobService.applyForJob(this.job).subscribe(value => {
        }, error => {
            console.log(error);
        }, () => {
            this.applied = this.jobService.isApplied(this.job);
            this.refresh.emit();
        });


    }

    viewCandidates(job?: Job) {

        this.dialogService.openTaskEditDialog(job);

    }

}
