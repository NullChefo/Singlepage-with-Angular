import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../models/login.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.scss']
})

export class LoginUserComponent implements OnInit {

    public isFormWrong: boolean = false;

    formGroup!: FormGroup

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            isOrganization: [false]
        });
    }

    onSubmit(): void {

        const body = this.formGroup.value as Login;
        this.authService.loginUser$(body).subscribe({
            next: (user: any) => {
                if (user != null) {
                    this.authService.setLoggedUserInLocalStorage(user);
                    this.router.navigate(['/main']);
                }
                this.isFormWrong = true;
            }
        });
    }
}


