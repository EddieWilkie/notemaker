import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//Import Collection
import { Notes } from '../../../both/collections/notes.collection';
//Import common Note interface.
import { Note } from '../../../both/models/note.model';
import template from './app.component.web.html';
import style from './app.component.scss';
import {InjectUser} from "angular2-meteor-accounts-ui";
import { DisplayNamePipe } from './display-name.pipe';
//Root component template.



@Component({
  selector: 'app',
  template,
  styles: [style]
})

//Root component.
@InjectUser('user')
export class AppComponent {
  constructor() {

  }

  logout() {
    Meteor.logout();
  }
}
