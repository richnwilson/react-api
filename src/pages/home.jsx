import Coin from '../components/Coin'
import FilterInput from '../components/FilterInput'
import Sort from '../components/Sort'
import Loader from '../components/Loader'

const HomePage = ({
  coins,
  loading,
  error,
  limit,
  filter,
  sortBy,
  setState,
}) => {
  // slice creates a shallow copy to not force re-rendering due to coins change
  const filteredCoins = coins
    .filter(({ name, symbol }) => {
      return (
        name.toLowerCase().includes(filter.toLowerCase()) ||
        symbol.toLowerCase().includes(filter.toLowerCase())
      )
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap
        case 'price_desc':
          return b.current_price - a.current_price
        case 'price_asc':
          return a.current_price - b.current_price
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h
      }
    })

  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <Loader color='white' />}
      {error && <div className='error'>Error: {error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setState} />
        <div className='controls'>
          <label htmlFor='limit'>Show:</label>
          <select
            value={limit}
            name='limit'
            id='limit'
            onChange={(e) =>
              setState((p) => ({ ...p, limit: Number(e.target.value) }))
            }
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>
        <Sort sortBy={sortBy} onSortChange={setState} />
      </div>

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <Coin coin={coin} key={coin.id} />)
          ) : (
            <p>No matches found ...</p>
          )}
        </main>
      )}
    </div>
  )
}

export default HomePage
