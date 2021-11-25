import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickOnLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="tabs-container">
        <Link to="/" className="link-item">
          <li key="logo-home">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </li>
        </Link>
        <div className="home-jobs-container">
          <Link className="link-item" to="/">
            <li key="home" className="tab-item">
              Home
            </li>
          </Link>
          <Link className="link-item" to="/jobs">
            <li key="job" className="tab-item">
              Jobs
            </li>
          </Link>
        </div>
        <Link className="link-item" to="/user-profile">
          <li key="profile" className="profile-icon">
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637651836/BharathPurudiPP_vckyod.jpg"
              alt="pro icon"
              className="pro-icon-class"
            />
          </li>
        </Link>
      </ul>
      <button
        className="logout-button"
        type="button"
        onClick={onClickOnLogoutButton}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
