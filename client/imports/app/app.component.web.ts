import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//Import Collection
import { Notes } from '../../../both/collections/notes.collection';
//Import common Note interface.
import { Note } from '../../../both/models/note.model';
import style from './app.component.scss';
//Root component template.
import template from './app.component.web.html';


@Component({
  selector: 'app',
  template,
  styles: [style]
})

//Root component.
export class AppComponent {}
