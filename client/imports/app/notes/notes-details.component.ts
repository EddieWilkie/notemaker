import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";

import 'rxjs/add/operator/map';

import { Notes } from '../../../../both/collections/notes.collection';
import { Note } from '../../../../both/models/note.model';
import template from './notes-details.component.html';
import style from './note-details.component.scss';

@Component({
  selector: 'notes-details',
  template,
  styles: [style]
})

@InjectUser('user')
export class NotesDetailsComponent implements OnInit, OnDestroy, CanActivate {
  noteId: string;
  paramsSub: Subscription;
  note:Note;
  noteSub: Subscription;
  user: Meteor.User;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['noteId'])
    .subscribe(noteId => {
      this.noteId = noteId;

      if (this.noteSub) {
          this.noteSub.unsubscribe();
        }

        this.noteSub = MeteorObservable.subscribe('note', this.noteId).subscribe(() => {
          this.note = Notes.findOne(this.noteId);
        });
      //return the note object.
      this.note = Notes.findOne(this.noteId);
    });

}
  //update note details.
  saveNote(){
    //Check to see if user is logged in.
    if (!Meteor.userId()) {
     alert('Please log in to change this note');
     return;
   }
    Notes.update(this.note._id, {
      $set: {
        title: this.note.title,
        description: this.note.description,
        createdAt: new Date(),
        'public': this.note.public
      }
    });
  }

  get isOwner(): boolean {
       return this.note && this.user && this.user._id === this.note.owner;
     }

  get isPublic(): boolean {
       return this.note && this.note.public;
   }

  canActivate() {
    const note = Notes.findOne(this.noteId);
    return (note && note.owner == Meteor.userId());
  }
  //Unsibscribe when not in use to prevent performance issues/memory leaks.
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.noteSub.unsubscribe();
  }
}
