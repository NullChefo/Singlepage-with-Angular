import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AclGuard} from '../guards/acl.guard';
import {JobFormComponent} from './components/job-form/job-form.component';
import {JobListComponent} from './components/job-list/job-list.component';
import {JobsComponent} from './components/jobs/jobs.component';
import {ApplicationsComponent} from "./components/my-applications/my-applications.component";

const routes: Route[] = [
    {
        path: '',
        component: JobsComponent,
        children: [
            {
                path: 'jobs',
                component: JobListComponent
            },
            {
                path: 'jobs/edit',
                component: JobFormComponent,
                canActivate: [AclGuard]
            },
            {
                path: 'jobs/applications',
                component: ApplicationsComponent,
            },
            {
                path: 'jobs/edit/:id',
                component: JobFormComponent,
                canActivate: [AclGuard]
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'jobs'
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
export class JobsRoutingModule {
}
