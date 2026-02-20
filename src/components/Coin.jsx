import { Link } from 'react-router'
const Coin = ({
  coin: {
    id,
    name,
    image,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
  },
}) => {
  return (
    <Link to={`/coin/${id}`}>
      <div className='coin-card'>
        <div className='coin-header'>
          <img src={image} alt={name} className='coin-image' />
        </div>
        <div>
          <h2>{name}</h2>
          <p className='symbol'>{symbol.toUpperCase()}</p>
        </div>
        <p>Price: ${current_price.toLocaleString()}</p>
        <p
          className={price_change_percentage_24h >= 0 ? 'positive' : 'negative'}
        >
          {price_change_percentage_24h?.toFixed(2) || 'N/A'}%
        </p>
        <p>Market Cap: {market_cap.toLocaleString()}</p>
      </div>
    </Link>
  )
}

export default Coin
