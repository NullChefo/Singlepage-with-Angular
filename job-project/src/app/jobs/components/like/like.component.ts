import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../models/job.model";
import {LikeService} from "../../services/like.service";


@Component({
    selector: 'app-like',
    templateUrl: './like.component.html',
    styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {


    @Input() job!: Job;
    isLiked: boolean = false;
    likeCount: number = 0;


    constructor(private likeService: LikeService) {
    }

    ngOnInit(): void {
        this.isLiked = this.likeService.isLiked(this.job);
        this.likeCount = this.likeService.countLikes(this.job);
    }

    onLike() {
        this.likeService.likeJob(this.job).subscribe(value => {

        }, error => {
            console.log(error);
        }, () => {
            this.isLiked = this.likeService.isLiked(this.job);
            this.likeCount = this.likeService.countLikes(this.job);
        });

    }
}
