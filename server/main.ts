import { Meteor } from 'meteor/meteor';

import { loadNotes } from './imports/fixtures/notes';

import './imports/publications/notes';

Meteor.startup(() => {
  loadNotes();
});
