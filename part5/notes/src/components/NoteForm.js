const NoteForm = ({ newNote, handleNoteChange, addNote }) => (
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={handleNoteChange}
    />
    <button type="submit">Save</button>
  </form>
);

export default NoteForm;
