import { Component } from '@angular/core';
import { NotesList } from "../shared-components/notes-list.class";

import template from './notes-list.component.mobile.html';

@Component({
  selector: 'notes-list',
  template
})
export class NotesListMobileComponent extends NotesList {

}
