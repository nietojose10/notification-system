import { Button, Col, Form, Row } from 'react-bootstrap';
import '../broadcastMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
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

export const BroadcastForm = () => {

    const { category, message, categoryValid, messageValid, formState, setFormState, onInputChange, isFormValid } = useForm( formFields, formValidations );
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { startSendingMessage, isSaving, startLoadingCategories, categories } = useBroadcastMessageStore();
    const navigate = useNavigate();
  
    useEffect(() => {
        startLoadingCategories();
    }, [])
    

    const handleSubmit = async(e) => {
      e.preventDefault();
      setFormSubmitted(true);
      if (!isFormValid) return;
      // console.log(formState);
      await startSendingMessage(formState);
      // navigate('/');
    }

  return (
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
                  data-testid="category"
                  name="category"
                  value={category}
                  onChange={onInputChange}
                  isInvalid={ !!categoryValid && formSubmitted }
                >
                     <option value={''}>Select</option>
                    {
                        categories.map( (category) => {
                            return <option key={category._id} value={ category.messageType.toLowerCase() } >{ category.messageType }</option>
                        })
                    }
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
                    data-testid="message"
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
  )
}
