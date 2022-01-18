import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {Login} from "../../models/login.model";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            name: [''],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            isOrganization: [false]
        });
    }

    onSubmit(): void {

        const body = this.formGroup.value as Login;


        if (body.isOrganization) {
            body.role = 'organization'
        }else {
            body.role = 'user'
        }
            this.authService.registerUser(body).subscribe({

                next: (user: any) => {
                    if (user != null) {
                        this.router.navigate(['/auth/login']);
                    }
                }
            });

    }
}
