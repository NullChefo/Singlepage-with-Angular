import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {of, Subject, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {JobsService} from "../../services/jobs.service";
import {Job} from "../../models/job.model";
import {takeUntil} from "rxjs/operators";
import {User} from "../../../auth/models/user.model";

@Component({
    selector: 'app-job-form',
    templateUrl: './job-form.component.html',
    styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

    formGroup!: FormGroup;

    destroy$ = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private jobsService: JobsService
    ) {
    }


    ngOnInit(): void {
        this.buildForm();

        this.route.params.pipe(
            switchMap((params) => {
                const id = params['id'];

                if (id) {
                    return this.jobsService.getJob$(id);
                }

                return of(null);
            }),
            takeUntil(this.destroy$)
        ).subscribe({
            next: (response) => {
                this.buildForm(response);
            }
        });

    }

    onSubmit() {
        const job = this.formGroup.value as Job;

        let user: User =  JSON.parse(<string>localStorage.getItem('loggedUser'));
        job.creatorId = user.id;
        job.creatorName = user.name;
        job.isActive = true;

        let request$;

        if (!job.id) {
            request$ = this.jobsService.postJob$(job);
        } else {
            request$ = this.jobsService.putJob$(job);
        }

        request$.subscribe({
            next: () => {
                this.router.navigate(['/main', 'jobs']);
            }
        });


    }

    private buildForm(job?: Job | null): void {


            this.formGroup = this.fb.group({
                id: job?.id ,
                title: [job?.title || ''],
                description: [job?.description || '' ],
                kind: [job?.kind || 'full-time'],
                department: [job?.department || 'office-administration' ]
            });


    }


}
