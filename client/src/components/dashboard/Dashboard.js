import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getcurrentUserProfile, deleteAccount } from '../../actions/profile'
import Spinner from '.././layout/Spinner'
import { Link } from 'react-router-dom'
import { DashboardActions } from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
const Dashboard = ({
  deleteAccount,
  getcurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getcurrentUserProfile() // it runs as soon as / dashboard loads
  }, [getcurrentUserProfile]) // to  remove warning
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              style={{ borderRadius: '4px' }}
              onClick={() => deleteAccount()}
            >
              <i className='fas fa-user-minus'></i> Delete my account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile, please add some info</p>
          <Link
            to='/create-profile'
            className='btn btn-primary my-1'
            style={{ borderRadius: '5px' }}
          >
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
  //if user exist then user.name
}

Dashboard.propTypes = {
  getcurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  deleteAccount: PropTypes.func.isRequired,
})
export default connect(mapStateToProps, {
  getcurrentUserProfile,
  deleteAccount,
})(Dashboard)
