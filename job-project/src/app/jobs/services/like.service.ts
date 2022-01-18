import {Injectable} from '@angular/core';
import {Job, Like} from "../models/job.model";
import {AuthService} from "../../auth/services/auth.service";
import {JobsService} from "./jobs.service";
import {User} from "../../auth/models/user.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(private jobService: JobsService, private authService: AuthService) {
    }

    likeJob(job: Job): Observable<Job> {
        let user: User = JSON.parse(<string>localStorage.getItem('loggedUser'));
        let newLike: Like = {userId: user.id}


        if (this.isLiked(job)) {

            job.likes = job.likes.filter(likes => likes.userId !== user.id);  // if is liked already

            //   console.log('filter');
        } else {
            if (job.likes) {
                if (job.likes.length == 0) {
                    job.likes = new Array(newLike);
                } else {
                    job.likes = job.likes.concat(newLike);
                    //      console.log('concat');
                }
            } else {
                job.likes = new Array(newLike);
                  //     console.log('new');
            }
        }

        return this.jobService.putJob$(job);

    }

    isLiked(job: Job): boolean {
        let user: User = JSON.parse(<string>localStorage.getItem('loggedUser'));
        if (job.likes) {
            let result = job.likes.find((j) =>
                j.userId === user.id
            );

            if (result == null) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    countLikes(job: Job): number {
        if (job.likes) {

            return job.likes.length;
        }
        return 0;

    }


}
