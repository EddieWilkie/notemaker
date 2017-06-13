import { OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

//Import Collection
import { Notes } from '../../../../both/collections/notes.collection';
//Import common Note interface.
import { Note } from '../../../../both/models/note.model';
//Root component template.
import template from './notes-list.component.html';
import style from './notes-list.component.scss';


@InjectUser('user')
export class NotesList implements OnInit, OnDestroy {
  notes: Observable<Note[]>;
  notesSub: Subscription;
  user:Meteor.User;

ngOnInit() {
    //Recover all noet documents in collection. Zone() methods used as wrapper
    //to connect the collection changes to our view.
    this.notes = Notes.find({}, { sort: { createdAt: -1 } }).zone();
    this.notesSub = MeteorObservable.subscribe('notes').subscribe();
  }

  search(value: string): void {
    this.notes = Notes.find(value ? {title: value} : {}).zone();
  }
  removeNote(note:Note){
    Notes.remove(note._id);
  }

  isOwner(note: Note): boolean{
     return this.user && this.user._id === note.owner;
  }

  //End Subscription to prevent memory leaks.
  ngOnDestroy(){
    this.notesSub.unsubscribe();
  }
}
