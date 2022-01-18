import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {LoginUserComponent} from "./components/login/login-user.component";
import {RegisterUserComponent} from "./components/register/register-user.component";
import {EditUserComponent} from "./components/edit/edit-user.component";



const routes: Route[] = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'register',
                component: RegisterUserComponent
            },

            {
                path: 'edit',
                component: EditUserComponent
            },
            {
                path: 'login',
                component: LoginUserComponent
            },

            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}
