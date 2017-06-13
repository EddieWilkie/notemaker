import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from './app.component.web';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { NOTES_DECLARATIONS } from './notes';
import { MaterialModule, MdButtonModule, MdInputModule } from "@angular/material";
import { AUTH_DECLARATIONS } from "./auth/index";
import { DisplayNamePipe } from './display-name.pipe';
import { MOBILE_DECLARATIONS } from "./mobile/index";
import { AppMobileComponent } from "./mobile/app.component.mobile";
import { IonicModule, IonicApp } from "ionic-angular";
import { NotesListMobileComponent } from "./mobile/notes-list.component.mobile";

let moduleDefinition;

if (Meteor.isCordova) {
  moduleDefinition = {
    imports: [
      IonicModule.forRoot(AppMobileComponent)
    ],
    declarations: [
      DisplayNamePipe,
      ...MOBILE_DECLARATIONS
    ],
    providers: [
    ],
    bootstrap: [
      IonicApp
    ],
    entryComponents: [
      NotesListMobileComponent
    ]
  }
}
else {
  moduleDefinition = {
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes),
      AccountsModule,
      MaterialModule.forRoot(),
      MdButtonModule,
      MdInputModule
    ],
    declarations: [
      AppComponent,
      DisplayNamePipe,
      ...NOTES_DECLARATIONS,
      ...AUTH_DECLARATIONS
    ],
    providers: [
      ...ROUTES_PROVIDERS
    ],
    bootstrap: [
      AppComponent
    ]
  }
}

@NgModule(moduleDefinition)
export class AppModule {}
