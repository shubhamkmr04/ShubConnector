import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getProfileByUserId } from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
const Profile = ({
  getProfileByUserId,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id)
  }, [getProfileByUserId])
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link
            className='btn btn-light'
            style={{ borderRadius: '5px' }}
            to='/profiles'
          >
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link
                to='/edit-profile'
                className='btn btn-dark'
                style={{ borderRadius: '5px' }}
              >
                Edit profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(mapStateToProps, { getProfileByUserId })(Profile)
