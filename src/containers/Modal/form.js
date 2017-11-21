import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {FORM_NAME} from './constants'
import {Field, reduxForm} from 'redux-form'
import {inputText} from '../../utils/forms/components';
import {Form} from 'react-bootstrap'

class VictoryForm extends Component {

    render() {
        const {handleSubmit, onSubmit, pristine, submitting, invalid} = this.props;
        return (

            <Form inline={true} onSubmit={handleSubmit(onSubmit)}>

                <Field
                    placeholder="Name"
                    name="name"
                    component={inputText}
                />

                <Button type="submit" disabled={pristine || submitting || invalid}>Submit</Button>
            </Form>);
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required'
    }

    return errors;
};


VictoryForm = reduxForm({
    form: FORM_NAME,
    validate
})(VictoryForm);

export default VictoryForm;
