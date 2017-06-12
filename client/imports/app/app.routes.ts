import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { NotesListComponent } from './notes/notes-list.component';
import { NotesDetailsComponent } from './notes/notes-details.component';

export const routes: Route[] = [
  {path: '', component: NotesListComponent },
  {path: 'note/:noteId', component: NotesDetailsComponent, canActivate: ['canActivateForLoggedIn']}
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
