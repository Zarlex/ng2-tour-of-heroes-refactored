import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {HeroesModule} from '../heroes/heroes.module';

import {DashboardIndexComponent}     from './components/index/index.component';

import {DashboardRoutingModule}     from './dashboard.routes';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HeroesModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardIndexComponent
    ]
})
export class DashboardModule {
}