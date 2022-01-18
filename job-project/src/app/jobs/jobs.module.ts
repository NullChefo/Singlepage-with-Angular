import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JobsRoutingModule} from './jobs-routing.module';
import {JobListComponent} from './components/job-list/job-list.component';
import {JobsComponent} from './components/jobs/jobs.component';
import {JobFormComponent} from './components/job-form/job-form.component';
import {JobItemComponent} from './components/job-item/job-item.component';
import {LikeComponent} from './components/like/like.component';


import {ApplicationsComponent} from "./components/my-applications/my-applications.component";
import {ApplicationsPopUpComponent} from "../applications/components/applications-pop-up/applications-pop-up.component";
import {ApplicationsItemComponent} from "../applications/components/applications-item/applications-item.component";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        JobsRoutingModule
    ],
    declarations: [
        JobListComponent,
        JobItemComponent,
        JobFormComponent,
        JobsComponent,
        LikeComponent,
        ApplicationsPopUpComponent,
        ApplicationsItemComponent,
        ApplicationsComponent
    ]
})
export class JobsModule {
}
