import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addEducation } from '../../../actions/profile'
const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: '',
    description: '',
  })
  const [disabletodate, toggledisable] = useState(false)
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Education</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any school or bootcamp you have
        attended
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault()
          addEducation(formData, history)
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School Title'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
            style={{ outline: 'none', borderRadius: '10px' }}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            value={degree}
            onChange={(e) => onChange(e)}
            placeholder='* Degree'
            name='degree'
            required
            style={{ outline: 'none', borderRadius: '10px' }}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            name='fieldofstudy'
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
            This is my current School
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
            placeholder='Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
