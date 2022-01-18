import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";



@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit
{
    user!: User;
    formGroup!: FormGroup;


    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
    }


    ngOnInit(): void {
        this.buildForm();

        this.user = JSON.parse(<string>localStorage.getItem('loggedUser'));
        console.log(this.user);
        if (this.user != null) {
            this.authService.getUser$(this.user.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.buildForm(response);
                }
            });
        } else{

            this.router.navigate(['/auth', 'login']);

        }

    }

    onSubmit(): void {
        const user = this.formGroup.value as User;

        let request$;

        request$ = this.authService.editUser$(user);

        request$.subscribe({
            next: () => {
                this.router.navigate(['/main', 'jobs']);
            }
        });
    }

    private buildForm(user?: User | null): void {


        this.formGroup = this.fb.group({
            id: [user?.id || ''],
            name: [user?.name || ''],
            email: [user?.email || ''],
            password: [user?.password || ''],
            role: [user?.role || ''],

        });

    }


    onDelete(): void {

        this.authService.deleteUser$(this.user).subscribe({
            next: () => {
                this.router.navigate(['/auth', 'login']);
                this.authService.logout();
            }
        });
    }
}
