const NoteForm = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      value={value}
      onChange={onChange}
    />
    <button type="submit">Save</button>
  </form>
);

export default NoteForm;
