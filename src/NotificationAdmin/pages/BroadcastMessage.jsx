import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NotificationLayout } from '../';
import '../broadcastMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm, useBroadcastMessageStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const formFields = {
  category: '',
  message: ''
}

const selectsValidation = (value) => {
  return (!!value) ? true : false;
}

const formValidations = [
  {
    formField: 'category',
    fn: (value) => selectsValidation(value),
    message: 'Category is a mandatory field'
  },
  {
    formField: 'message',
    fn: (value) => value.length >= 1,
    message: 'Message is a mandatory field'
  }
];


export const BroadcastMessage = () => {

  const { category, message, categoryValid, messageValid, formState, setFormState, onInputChange, isFormValid } = useForm( formFields, formValidations );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { startSendingMessage, isSaving } = useBroadcastMessageStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    await startSendingMessage(formState);
    navigate('/logHistory');
  }

  return (
    <NotificationLayout>
      <Container>
        <div className="ctn-broadcast-message-form" style={{ cursor: isSaving ? 'wait' : '' }}>
          
          <Row className="align-item-center">
              <Col>
                  <div className="title-form"><FontAwesomeIcon icon={faTowerBroadcast} size="2xl" style={{ color: "#BE7B72"}} /></div>
                  <hr className="hr-forms" />
              </Col>
          </Row>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} lg={12} md={12} sm={12} className="mb-3" controlId="id_category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                        
                        name="category"
                        value={category}
                        onChange={onInputChange}
                        isInvalid={ !!categoryValid && formSubmitted }
                    >
                        <option value={''}>Seleccionar</option>
                        <option value={'Sports'}>Sports</option>
                        <option value={'Finance'}>Finance</option>
                        <option value={'Movies'}>Movies</option>
                        {/* {
                            clinicsByUser.map( (clinic) => {
                                return <option key={clinic.value} value={ clinic.value } >{ clinic.label }</option>
                            })
                        } */}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        { categoryValid }
                    </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_message"
                    >
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter a message you want to broadcast"
                        name="message"
                        value={ message }
                        onChange={ onInputChange }
                        isInvalid={ !!messageValid && formSubmitted }

                        />
                        <Form.Control.Feedback type="invalid">
                          { messageValid }
                        </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="ctn-broadcast-buttons">
                <Col lg={8} md={12} sm={12} >
                  <Button
                    disabled={isSaving}
                    type="submit"
                    className="btn-custom-primary"
                  >
                    Send                    
                  </Button>        
                </Col>
              </Row>
            </Form>
        </div>  
      </Container>
      
    </NotificationLayout>
  )
}
