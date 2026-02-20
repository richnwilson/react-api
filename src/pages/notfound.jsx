import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <div className='container'>
      <h1 className='title'>404</h1>
      <p className='message'>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link className='link' to='/'>
        Home
      </Link>
    </div>
  )
}
export default NotFoundPage
