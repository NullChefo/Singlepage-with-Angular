import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {JobsService} from "../../services/jobs.service";
import {Job} from "../../models/job.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ApplicationsService} from "../../../applications/services/applications.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobs: Job[] =[];

    hasPermissions!: boolean;
    message!: string;

    constructor(
        private authService: AuthService,
        private jobsService: JobsService,

    ) {

    }

    ngOnInit(): void {
       this.hasPermissions = this.authService.hasPermissions('organization');
       this.fetchJobs();
    }

    fetchJobs(){
        this.jobsService.getJobs$().subscribe({
            next: (response: Job[]) => {
                this.jobs = response;
            },
            error: (response: HttpErrorResponse) => {
                console.log(response);
            }
        });
    }

    onDelete(id: number): void {
        this.jobsService.deleteJob$(id).subscribe({
            next: () => {
                this.jobs = this.jobs.filter(job => job.id !== id);
            }
        });
    }

    refresh() {
        this.fetchJobs();
    }
}
