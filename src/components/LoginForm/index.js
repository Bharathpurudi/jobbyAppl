import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', passwordType: 'password'}

  onChangeOfUsername = event => {
    if (event.target.value === 'bharath') {
      this.setState({username: 'rahul'})
    }
  }

  onChangeOfPassword = event => {
    if (event.target.value === 'bharath@2021') {
      this.setState({password: 'rahul@2021'})
    }
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const body = JSON.stringify(userDetails)
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body,
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorText = data.error_msg
      this.setState({errorMsg: errorText})
    }
  }

  showPasswordCheckBox = event => {
    if (event.target.checked === true) {
      this.setState({passwordType: 'text'})
    } else {
      this.setState({passwordType: 'password'})
    }
  }

  renderLoginForm = () => {
    const {errorMsg, passwordType} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <label htmlFor="username-input" className="label">
            USERNAME
          </label>
          <input
            type="text"
            className="login-input-element"
            id="username-input"
            placeholder="Username"
            onChange={this.onChangeOfUsername}
          />
          <label className="label" htmlFor="password-input">
            PASSWORD
          </label>
          <input
            type={passwordType}
            className="login-input-element"
            id="password-input"
            placeholder="Password"
            onChange={this.onChangeOfPassword}
          />
          <div className="show-password-container">
            <input
              type="checkbox"
              onChange={this.showPasswordCheckBox}
              className="checkbox-show"
              id="showPassword"
            />
            <label className="label" htmlFor="showPassword">
              Show Password
            </label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-bg-container">{this.renderLoginForm()}</div>
    )
  }
}

export default LoginForm
