const Filter = ({ filterBy, handleFilterChange}) => {
  return (
    <>
      <span>filter contacts by:</span>
        <input
          value={filterBy}
          onChange={handleFilterChange}
        />
    </>
  );
};

export default Filter;
