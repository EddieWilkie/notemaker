import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//Import collection to add new notes to db
import { Notes } from '../../../../both/collections/notes.collection';

import template from './notes-form.component.html';
import style from './notes-form.component.scss';
//form component for adding new notes.
@Component({
  selector: 'notes-form',
  template,
  styles: [style]
})

@InjectUser('user')
export class NotesFormComponent {
  addForm: FormGroup;
  user:Meteor.User;
  showAddNote: boolean;
//Form builder prvisdes form control methods.
  constructor(
    private formBuilder: FormBuilder
  ) {}

  //From OnItit interface.
  ngOnInit() {
    this.showAddNote = false;
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],//Title is required
      description: ['', Validators.required],// description is required.
      createdAt: [],
      public: [false]
    });
  }

  toggleAddNote(){
    this.showAddNote = !this.showAddNote;
  }

  //Add a new note to the collection.
  addNote(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a note.');
      return;
    }

    if(this.addForm.valid) {
        Notes.insert({
          title: this.addForm.value.title,
          description: this.addForm.value.description,
          createdAt: new Date(),
          owner: Meteor.userId(),
          public: this.addForm.value.public
        });

        this.addForm.reset();
        this.showAddNote = false;
    }
  }
}
