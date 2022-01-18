import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Candidate, Job} from "../../../jobs/models/job.model";
import {User} from "../../../auth/models/user.model";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {buildMonths} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
import {JobsService} from "../../../jobs/services/jobs.service";
import {ApplicationsService} from "../../services/applications.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-applications-item',
    templateUrl: './applications-item.component.html',
    styleUrls: ['./applications-item.component.scss']
})
export class ApplicationsItemComponent implements OnInit {
    @Input() job!: Job;

    isCreator: boolean = false;
    message!:string;

    constructor(private http: HttpClient,  private router: Router,) {

    }

    ngOnInit(): void {
        this.isCreator = this.checkOwnership();
    }



    checkOwnership(): boolean {
        let user: User = JSON.parse(<string>localStorage.getItem('loggedUser'));
        return this.job.creatorId == user.id;

    }

    checkTheBox(job: Job, candidate: Candidate) {

        let newCandidateList: Candidate[];
        newCandidateList = job.candidates.filter(c => c !== candidate);


        candidate.approved = !candidate.approved;

        newCandidateList.push(candidate);
        if (newCandidateList.length > 0) {


            job.candidates = newCandidateList;
            console.log(job.candidates);

            this.putJob$(job).subscribe({
                    next: () => {
                    },
                    error: (err) => {
                        console.log(err);
                    },
                    complete: () => {
                        this.job = job;

                    }
                }
            );
        }


    }

    putJob$(job: Job): Observable<Job> {
        return this.http.put<Job>(`${environment.API_URL}/jobs/${job.id}`, job);
    }

    isChecked(c: Candidate) {
        return c.approved;
    }
}
