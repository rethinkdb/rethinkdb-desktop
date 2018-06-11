import React, { Fragment } from 'react'
import Icon from '../../../components/Icon'
import { withFormik, Form, Field } from 'formik'
import { StyledEditForm, GoBackLink } from './styles'
const EditConnectionForm = () => {
  return (
    <Fragment>
      <a href="#/newConnection" className={GoBackLink}>
        <i className="icon-arrow-left" /> Go Back
      </a>
      <StyledEditForm>
        <div className="title">
          <Icon type="database" size={32} /><h2>Manage Connection</h2>
        </div>
        <Form>
          <div className="row">
            <Field
              name="name"
              type="text"
              maxLength={20}
            />
          </div>
          <div className="row">
            <Field name="address" type="text" />
          </div>
          <div className="row actions">
            <button>Save</button>
          </div>
        </Form>
      </StyledEditForm>
    </Fragment>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ connection }) => {
    return {
      name: connection.name || '',
      address: connection.address || ''
    }
  },
  handleSubmit(values, {props}) {
    props.onSave(values)
  }
})(EditConnectionForm)
