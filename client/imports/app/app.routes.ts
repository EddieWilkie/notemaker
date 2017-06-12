import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { NotesListComponent } from './notes/notes-list.component';
import { NotesDetailsComponent } from './notes/notes-details.component';
import {LoginComponent} from "./auth/login.component";
import {SignupComponent} from "./auth/signup.component";
import {RecoverComponent} from "./auth/recover.component";

export const routes: Route[] = [
  {path: '', component: NotesListComponent },
  {path: 'note/:noteId', component: NotesDetailsComponent, canActivate: ['canActivateForLoggedIn']},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
