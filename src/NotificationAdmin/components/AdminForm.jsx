import { useState } from 'react';
import { faGears, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useAdminStore, useForm } from '../../hooks';


const formFields = {
    username: '',
    email: '',
    phoneNumber: ''
}

const formValidations = [
    {
      formField: 'username',
      fn: (value) => value.length >= 1,
      message: 'Username is a mandatory field'
    },
    {
      formField: 'email',
      fn: (value) => value.includes('@'),
      message: 'Enter a valid email'
    },
    {
        formField: 'phoneNumber',
        fn: (value) => value.length >= 1,
        message: 'Phone number is a mandatory field'
      }
  ];

const categoriesOptions = [
    { value: 'sports', label: 'Sports' },
    { value: 'finance', label: 'Finance' },
    { value: 'movies', label: 'Movies' }
];

const notificationTypes = [
    { value: 'sms', label: 'SMS' },
    { value: 'email', label: 'Email' },
    { value: 'push notification', label: 'Push Notification' }
];

export const AdminForm = () => {

    const { username, email, phoneNumber, usernameValid, emailValid, phoneNumberValid, formState, 
            onInputChange, setFormState, isFormValid
        } = useForm( formFields, formValidations );
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { startSavingUser } = useAdminStore();

    const [formValues, setFormValues] = useState({
        categories: [],
        channels: [],
    });

    const onSelectChange = ( value, changing ) => {
        setFormValues({ 
            ...formValues, 
            [changing]: value
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        console.log('Submitting...');
        if( !isFormValid ) return;
        // console.log();

        const categoriesValues = formValues.categories.map( data => 
            data.value
        );

        const channelsValues = formValues.channels.map( data => 
            data.value
        );

        startSavingUser({name:username, email, phoneNumber, subscribed: categoriesValues, channels: channelsValues});
    }

  return (
    <div className="ctn-admin-form">
          <Row className="align-item-center">
              <Col>
                  <div className="title-form"><FontAwesomeIcon icon={faGears} size="2xl" style={{ color: "#BE7B72"}} /></div>
                  <hr className="hr-forms" />
              </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_username"
                >
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Enter an username"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                    isInvalid={ !!usernameValid && formSubmitted }
                    />
                    <Form.Control.Feedback type="invalid">
                        { usernameValid }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_email"
                >
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Enter an email"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                    isInvalid={ !!emailValid && formSubmitted }

                />
                    <Form.Control.Feedback type="invalid">
                        { emailValid }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_phone_number"
                >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Enter a phone number"
                    name="phoneNumber"
                    value={ phoneNumber }
                    onChange={ onInputChange }
                    isInvalid={ !!phoneNumberValid && formSubmitted }

                />
                    <Form.Control.Feedback type="invalid">
                        { phoneNumberValid }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="id_categories">
                    <Form.Label>Message Categories</Form.Label>
                    <Select
                        value={ formValues.categories }
                        onChange={( event ) => onSelectChange( event, 'categories' )}
                        options={categoriesOptions}
                         // options={
                        //     specialities.map( data => (
                        //         { value: data.speciality, label: data.speciality }
                        //     ))
                        // 
                        isMulti
                        placeholder="Select the subscriptions"
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="id_channels">
                    <Form.Label>Notification Types</Form.Label>
                    <Select
                        value={ formValues.channels }
                        onChange={( event ) => onSelectChange( event, 'channels' )}
                        options={notificationTypes}
                        // options={
                        //     specialities.map( data => (
                        //         { value: data.speciality, label: data.speciality }
                        //     ))
                        // } 
                        isMulti
                        placeholder="Select the notification types"
                    />
                </Form.Group>
            </Row>
            <Row className="ctn-admin-user-buttons">
                <Col lg={8} md={12} sm={12} >
                    <Button
                    type="submit"
                    className="btn-custom-primary"
                    >
                    Save                    
                    </Button>        
                </Col>
            </Row>
          </Form>
    </div>
  )
}
