import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addExperience } from '../../../actions/profile'
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: '',
    description: '',
  })
  const [disabletodate, toggledisable] = useState(false)
  const { company, title, location, from, to, current, description } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault()
          addExperience(formData, history)
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
            style={{ outline: 'none', borderRadius: '10px' }}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            value={company}
            onChange={(e) => onChange(e)}
            placeholder='* Company'
            name='company'
            required
            style={{ outline: 'none', borderRadius: '10px' }}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            value={location}
            onChange={(e) => onChange(e)}
            name='location'
            style={{ outline: 'none', borderRadius: '10px' }}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            onChange={(e) => onChange(e)}
            value={from}
            name='from'
            style={{ outline: 'none', borderRadius: '10px' }}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              style={{ outline: 'none', borderRadius: '10px' }}
              onChange={(e) => {
                setFormData({ ...formData, current: !current })
                toggledisable(!disabletodate)
              }}
            />{' '}
            This is my current job
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            style={{ outline: 'none', borderRadius: '10px' }}
            value={to}
            disabled={disabletodate ? 'disabled' : ''}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            style={{ outline: 'none', borderRadius: '10px' }}
            value={description}
            onChange={(e) => onChange(e)}
            placeholder='Job Description'
          ></textarea>
        </div>
        <input
          type='submit'
          style={{ outline: 'none', borderRadius: '5px' }}
          class='btn btn-primary my-1'
        />
        <a
          class='btn btn-light my-1'
          style={{ outline: 'none', borderRadius: '5px' }}
          href='dashboard.html'
        >
          Go Back
        </a>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))
