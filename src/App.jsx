import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import axios from 'axios'
import HomePage from './pages/home'
import AboutPage from './pages/about'
import Header from './components/Header'
import NotFoundPage from './pages/notfound'
import CoinPage from './pages/coin'

const App = () => {
  const [state, setState] = useState({
    coins: [],
    loading: true,
    error: null,
    limit: 10,
    filter: '',
    sortBy: 'market_cap_desc',
  })
  const { coins, loading, error, limit, filter, sortBy } = state

  useEffect(() => {
    ;(async () => {
      try {
        const { data = [] } = await axios(
          `${import.meta.env.VITE_API_URL}vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        )
        setState({ ...state, coins: data, error: false, loading: false })
      } catch (e) {
        setState({
          ...state,
          coins: [],
          error: e?.message || 'General Error',
          loading: false,
        })
      }
    })()
  }, [limit])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              loading={loading}
              error={error}
              limit={limit}
              filter={filter}
              sortBy={sortBy}
              setState={setState}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/coin/:id' element={<CoinPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
