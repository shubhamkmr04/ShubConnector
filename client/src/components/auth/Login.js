import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData // extracting value from formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    login({ email, password })
  }
  // redirect if loggedin
  if (isAuthenticated) {
    return <Redirect to='/dashboard' /> // but this has to be private with that particular user's data
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Login </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign in to Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            style={{ outline: 'none', borderRadius: '10px' }}
            type='email'
            placeholder='Email Address'
            value={email}
            name='email'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            style={{ outline: 'none', borderRadius: '10px' }}
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => onChange(e)}
            minLength='6'
            value={password}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { login })(Login)
