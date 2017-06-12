import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Note } from '../models/note.model';

//Creating and exporting notes collection.
export const Notes = new MongoObservable.Collection<Note>('notes');

function loggedIn() {
  return !!Meteor.user();
}
//Only allow inserts, updates and removes if user is logged in.
Notes.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
