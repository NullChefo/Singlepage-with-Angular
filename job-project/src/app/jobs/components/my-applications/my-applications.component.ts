import {Component, OnInit} from '@angular/core';
import {Job} from "../../models/job.model";
import {JobsService} from "../../services/jobs.service";

@Component({
    selector: 'app-my-applications',
    templateUrl: './my-applications.component.html',
    styleUrls: ['./my-applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

    jobs!: Job[];

    constructor(private jobService: JobsService) {
    }

    ngOnInit(): void {

       this.fetchJobs();

    }
    fetchJobs(){
        this.jobs = this.jobService.getAppliedJobs();
    }

    onDelete($event: number) {
    }
}
