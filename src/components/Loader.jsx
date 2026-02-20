import { BarLoader } from 'react-spinners'
const Loader = ({ color = 'blue' }) => {
  return (
    <div>
      <BarLoader
        color={color}
        aria-label='Loading ...'
        cssOverride={{
          display: 'block',
          margin: '0 auto',
          marginBottom: '2em',
        }}
      />
    </div>
  )
}

export default Loader
