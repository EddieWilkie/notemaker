import { Component } from '@angular/core';
import { NotesList } from '../shared-components/notes-list.class';

import template from './notes-list.component.html';
import style from './notes-list.component.scss';

@Component({
  selector: 'notes-list',
  template,
  styles: [ style ]
})

export class NotesListComponent extends NotesList {

}
