import {Injectable} from '@angular/core';
import {Login} from '../models/login.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {JobsService} from "../../jobs/services/jobs.service";
import {Job} from "../../jobs/models/job.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    hasUser$ = new BehaviorSubject<boolean>(false);
    jobs: Job[] = [];

    constructor(private http: HttpClient, private jobsService: JobsService) {
    }

    loginUser$(data: Login): any {
        {

            return this.http.get<User[]>(`${environment.API_URL}/users`).pipe(
                map((response: User[]) => {

                    const user = response.find((u => u.email === data.email && u.password === data.password));
                    if (!user) {
                        return null;
                    }
                    return user;
                })
            );
        }
    }


    registerUser(body: any): any {
        delete body.isOrganization;
        return this.http.post<User>(`${environment.API_URL}/users`, body);
    }


    logout(): void {
        localStorage.removeItem('loggedUser');
        this.setHasUser(false);
    }

    hasPermissions(role: string): boolean {
        const loggedUser = this.getLoggedUserFromLocalStorage();

        return loggedUser.role === role;
    }

    setLoggedUserInLocalStorage(user: any): void {

        // @ts-ignore
        delete user.password;

        localStorage.setItem('loggedUser', JSON.stringify(user));

        this.setHasUser(true);
    }

    getLoggedUserFromLocalStorage(): User {
        const loggedUser = this.getLoggedUser();

        if (loggedUser) {
            this.setHasUser(true);
        }

        return loggedUser;
    }

    getLoggedUser(): User {
        return JSON.parse(<string>localStorage.getItem('loggedUser'));
    }

    getHasUser$(): Observable<boolean> {
        return this.hasUser$.asObservable();
    }

    setHasUser(value: boolean): void {
        this.hasUser$.next(value);
    }


    getUser$(id: number): Observable<User> {
        return this.http.get<User>(`${environment.API_URL}/users/${id}`);
    }

    editUser$(user: User) {
        return this.http.put<User>(`${environment.API_URL}/users/${user.id}`, user);
    }

    deleteUser$(user: User): any {
        if (user.role == 'organization') {

            let current_user = this.getLoggedUser();
            let list_of_jobs: Job[] = [];

            this.jobsService.getJobs$().subscribe({
                next: (response: Job[]) => {
                    this.jobs = response;
                },
                error: (response: HttpErrorResponse) => {
                    console.log(response);
                }
            });

            this.jobs.forEach((job) => {
                if (job.creatorId == current_user.id) {
                    job.isActive = false;
                    list_of_jobs.push(job);
                }
            });

            list_of_jobs.every((j) => {
                this.http.put<Job[]>(`${environment.API_URL}/jobs/${j.id}`, j);
            });


        }
        return this.http.delete<void>(`${environment.API_URL}/users/${user.id}`);
    }
}
