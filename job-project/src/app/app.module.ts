import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/components/home/home.component';
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,


    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        NgbButtonsModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
