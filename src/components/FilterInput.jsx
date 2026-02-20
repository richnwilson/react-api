const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className='filter'>
      <input
        type='text'
        value={filter}
        onChange={(e) =>
          onFilterChange((p) => ({ ...p, filter: e.target.value }))
        }
        placeholder='Filter coins by name or symbol ..'
      />
    </div>
  )
}

export default FilterInput
