import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {NonAuthGuard} from './guards/non-auth.guard';
import {HomeComponent} from "./home/components/home/home.component";
import {EditUserComponent} from "./auth/components/edit/edit-user.component";


const routes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canLoad: [NonAuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canLoad: [NonAuthGuard]
    },
    {
        path: 'main',
        loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
        canLoad: [AuthGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
