import {NgModule} from '@angular/core';
import {LoginUserComponent} from './components/login/login-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './components/auth/auth.component';
import {AuthRoutingModule} from './auth-routing.module';

import {RegisterUserComponent} from "./components/register/register-user.component";
import {EditUserComponent} from "./components/edit/edit-user.component";



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthRoutingModule,

    ],
    declarations: [
        LoginUserComponent,
        RegisterUserComponent,
        AuthComponent,
     EditUserComponent
    ]
})
export class AuthModule {
}
