import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'
import Profileitem from './Profileitem'
import Spinner from '../layout/Spinner'
const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles()
  }, [getAllProfiles]) // to remove warning
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Profileitem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  profile: state.profile,
})
export default connect(mapStateToProps, { getAllProfiles })(Profiles)
