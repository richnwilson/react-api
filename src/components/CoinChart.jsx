import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { useState, useEffect } from 'react'
import Loader from './Loader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
)
const CoinChart = ({ coinId }) => {
  const [state, setState] = useState({
    chartData: null,
    loading: true,
    error: null,
  })
  const { chartData, loading, error } = state

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { prices = [] },
        } = await axios(
          `${import.meta.env.VITE_API_URL_COIN}/${coinId}/market_chart?vs_currency=usd&days=7`,
        )

        const data = prices.map((p) => ({ x: p[0], y: p[1] }))
        setState({
          ...state,
          chartData: {
            datasets: [
              {
                label: 'Price (USD)',
                data,
                fill: true,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0,123,255,0.1)',
                pointRadius: 0,
                tension: 0.3,
              },
            ],
          },
          error: false,
          loading: false,
        })
      } catch (e) {
        setState({
          ...state,
          coins: [],
          error: e?.message || 'General Error',
          loading: false,
        })
      }
    })()
  }, [coinId])

  return (
    <div style={{ marginTop: '2em' }}>
      {loading && <Loader />}
      {error && <div className='error'>{error}</div>}
      {!loading && !error && (
        <div style={{ marginTop: '2em' }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                x: {
                  type: 'time',
                  time: { unit: 'day' },
                  ticks: { autoSkip: true, maxTicksLimit: 7 },
                },
                y: {
                  ticks: { callback: (v) => `$${v.toLocaleString()}` },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  )
}

export default CoinChart
