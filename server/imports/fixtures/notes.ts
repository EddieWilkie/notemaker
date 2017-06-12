import { Notes } from '../../../both/collections/notes.collection';
import { Note } from '../../../both/models/note.model';
//If the collection is empty add display data.
export function loadNotes() {
  if (Notes.find().cursor.count() === 0) {
    const notes: Note[] = [{
      title: 'Shopping List',
      description: 'Milk, Eggs, Bacon.',
      createdAt: new Date(),
      owner: '0',
      public: true
    }, {
      title: 'Bills',
      description: 'Electricity, Water, Gas.',
      createdAt: new Date(),
      owner: '1',
      public: true
    }, {
      title: 'Birthday Gift Ideas',
      description: 'Money, Shoes, Wallet.',
      createdAt: new Date(),
      owner: '2',
      public: false
    }];

    notes.forEach((note: Note) => Notes.insert(note));
  }
}
