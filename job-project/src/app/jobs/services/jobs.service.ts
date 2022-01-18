import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidate, Job} from "../models/job.model";
import {environment} from "../../../environments/environment";
import {User} from "../../auth/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class JobsService {



    constructor(private http: HttpClient) {
    }

    getJobs$(): Observable<Job[]> {
        return this.http.get<Job[]>(`${environment.API_URL}/jobs`);
    }

    getJob$(id: number): Observable<Job> {
        return this.http.get<Job>(`${environment.API_URL}/jobs/${id}`);
    }

    postJob$(job: Job): Observable<Job> {
        return this.http.post<Job>(`${environment.API_URL}/jobs`, job);

    }

    putJob$(job: Job): Observable<Job> {
        return this.http.put<Job>(`${environment.API_URL}/jobs/${job.id}`, job);
    }

    deleteJob$(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.API_URL}/jobs/${id}`);
    }

    getAppliedJobs(): Job[] {
        let jobs: Job[];
        let listOfJobs: Job[] = [];
        let thisUser: User = JSON.parse(<string>localStorage.getItem('loggedUser'));

        this.getJobs$().subscribe({
                next: (response: Job[]) => {
                    jobs = response;
                },
                error: (response: HttpErrorResponse) => {
                    console.log(response);
                }, complete: () => {

                    jobs.forEach((job) => {
                        if (job.candidates) {
                            job.candidates.forEach((candidates) => {
                                if (candidates.userId == thisUser.id) {
                                    listOfJobs.push(job);
                                    return;
                                }
                            })
                        }

                    });
                }
            }
        );


        return listOfJobs;
    }

    isApplied(job: Job) {
        let thisUser: User = JSON.parse(<string>localStorage.getItem('loggedUser'));

        let isApplied: boolean = false;

        if (!job.candidates) {

            job.candidates = [];

        } else {

            job.candidates.forEach((candidates) => {
                if (candidates.userId == thisUser.id) {
                    isApplied = true;
                }
            });
        }

        return isApplied;
    }

    applyForJob(job: Job): Observable<Job> {

        let thisUser: User = JSON.parse(<string>localStorage.getItem('loggedUser'));


        if (this.isApplied(job)) {
            job.candidates = job.candidates.filter(candidates => candidates.userId !== thisUser.id);  // if is liked already
        } else {
            let candidates: Candidate = {userId: thisUser.id, name: thisUser.name, approved: false};

            if (!job.candidates) {
                job.candidates = [];

            }
            job.candidates.push(candidates);
        }

        return this.putJob$(job);

    }

    checkIfAccepted(job: Job): boolean {
        let thisUser: User = JSON.parse(<string>localStorage.getItem('loggedUser'));
        let thisJob: Candidate[] = job.candidates.filter(candidates => candidates.userId === thisUser.id && candidates.approved == true);

        return thisJob.length > 0;


    }


}
