import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const authlinks = (
    <ul>
      <img
        className='round-img'
        style={{
          width: '20px',
          position: 'absolute',
          marginLeft: '-17px',
        }}
        src={user && user.avatar}
      />
      <li>
        <a href='/dashboard'>
          <span className='hide-sm '>{user && user.name}</span>
        </a>
      </li>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <a href='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </a>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )
  const guestlinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'> Login </Link>
      </li>
    </ul>
  )
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>Connector
        </Link>
      </h1>
      {!loading && ( // if not loading then below
        <Fragment> {isAuthenticated ? authlinks : guestlinks}</Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logout })(Navbar)
