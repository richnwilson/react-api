import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router'
import Loader from '../components/Loader'
import CoinChart from '../components/CoinChart'

const CoinPage = () => {
  const { id } = useParams()
  const [state, setState] = useState({
    coin: null,
    loading: true,
    error: null,
  })
  const { coin, loading, error } = state
  useEffect(() => {
    ;(async () => {
      try {
        const { data = [] } = await axios(
          `${import.meta.env.VITE_API_URL_COIN}/${id}`,
        )
        setState({ ...state, coin: data, error: false, loading: false })
      } catch (e) {
        setState({
          ...state,
          coin: null,
          error: e?.message || 'General Error',
          loading: false,
        })
      }
    })()
  }, [id])
  return (
    <div className='coin-details-container'>
      <Link to='/'>Home</Link>
      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
      </h1>
      {loading && <Loader />}
      {error && <div className='error'>{error}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className='coin-details-image'
          />
          <p>{coin.description.en.split('. ')[0]} ...</p>
          <div className='coin-details-info'>
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
          </div>
          <CoinChart coinId={coin.id} />
        </>
      )}
      {!loading && !error && !coin && <p>No Data Found</p>}
    </div>
  )
}

export default CoinPage
