const NoteForm = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      value={value}
      onChange={onChange}
    />
    <button type="submit">save</button>
  </form>
);

export default NoteForm;
