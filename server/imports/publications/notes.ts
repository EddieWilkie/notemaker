import { Meteor } from 'meteor/meteor';
import { Notes } from '../../../both/collections/notes.collection';

Meteor.publish('notes', function() {
  return Notes.find(buildQuery.call(this));
});

Meteor.publish('note', function(noteId: string) {
  return Notes.find(buildQuery.call(this, noteId));
});

function buildQuery(noteId?: string): Object {
    const isAvailable = {
      $or: [{
        // party is public
        public: true
     },
     // or
     {
       // current user is the owner
       $and: [{
         owner: this.userId
       }, {
         owner: {
           $exists: true
         }
       }]
      }]
    };
    if (noteId) {
    return {
      // only single party
      $and: [{
          _id: noteId
        },
        isAvailable
      ]
    };
  }

  return isAvailable;
}
