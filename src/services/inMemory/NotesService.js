const { nanoid } = require('nanoid');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      id,
      title,
      body,
      tags,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((note) => note.id === id)[0];
    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }

    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const noteIndex = this._notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      throw new Error('Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[noteIndex] = {
      ...this._notes[noteIndex],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const noteIndex = this._notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      throw new Error('Id tidak ditemukan');
    }

    return this._notes.splice(noteIndex, 1);
  }
}

module.exports = NotesService;
