import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, Container, Header, FormField, Checkbox, Message } from 'semantic-ui-react';
import './App.css';

function App() {
  const [fullName, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [recurrence, setRecurrence] = useState(null);
  const [value, setValue] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [recurrenceError, setRecurrenceError] = useState(false);
  const [valueError, setValueError] = useState(false);

  const handleName = e => {
    setName(e.target.value);
  }
  const handlePhone = e => {
    setPhone(normalizePhoneNumber(e.target.value));
  }
  const handleRecurrence = (event, {value}) => setRecurrence(value);
  const handleCheck = (event, {value}) => setValue(value);

  function normalizePhoneNumber(phoneNumber) {
    if (!phoneNumber) return phoneNumber; 

    const currentNumber = phoneNumber.replace(/[^\d]/g,'');
    const cnLength = currentNumber.length;

    if (cnLength < 4) {
      return currentNumber;
    }
    if (cnLength < 7) {
      return `(${currentNumber.slice(0,3)}) ${currentNumber.slice(3)}`;
    }
    
    return `(${currentNumber.slice(0,3)}) ${currentNumber.slice(3,6)}-${currentNumber.slice(6,10)}`;
  }

  const handleSubmit = e => {
    e.preventDefault();
    let error = false;

    // TODO - check for only whitespace
    if(fullName === '') {
      setNameError(true);
      error = true;
    }
    else {
      setNameError(false);
    }
    // TODO - make sure they are digits
    if(phoneNumber.length < 10) {
      setPhoneError(true);
      error = true;
    }
    else {
      setPhoneError(false);
    }

    if(recurrence!=='weekly' && recurrence!=='biweekly') {
      setRecurrenceError(true);
      error = true;
    }
    else {
      setRecurrenceError(false);
    }

    if(value!=='yes' && value !=='no') {
      setValueError(true);
      error = true;
    }
    else {
      setValueError(false);
    }

    if(error) {
      setFormSuccess(false);
      setFormError(true);
      return;
    }
    else {
      setFormSuccess(true);
      setFormError(false);
    }

    var today = new Date(),
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

    const data = {
      name: fullName,
      phone: phoneNumber,
      recurrence: recurrence,
      eggs: value, 
      signupdate: date
    };

    axios.post('https://sheet.best/api/sheets/9b3475bb-d735-4c97-87c1-adba2c83555a', data)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error.response)
    });

    setName('');
    setPhone('');
    setRecurrence(null);
    setValue(null);
  }

  const MessageSuccess = () => (
    <Message
      success
      header='Your form has been submitted'
    />
  )

  return (
    <Container fluid className="container">
      <Header as='h1'>Sunset Ridge Farm</Header>
      <Header as='h2'>Vegetable Box Order Form</Header>
      <Form className="form" success={formSuccess} error={formError} onSubmit={handleSubmit}>
        <Form.Input
          required
          label="Name"
          name="fullName"
          placeholder="First and Last Name"
          type="text"
          value={fullName}
          onChange={handleName}
          error={nameError}
        />
        <Form.Input 
          required
          label="Phone Number"
          name="phoneNumber"
          placeholder="(555)555-5555"
          type="tel"
          value={phoneNumber}
          onChange={handlePhone}
          error={phoneError}
        />
        <Form.Field>
          How often would you like to receive a vegetable box?
        </Form.Field>
        <FormField>
          <Checkbox 
            radio 
            label='Weekly'
            name='checkboxRadioGroup2'
            value='weekly'
            checked={recurrence === 'weekly'}
            onChange={handleRecurrence}
            error={recurrenceError}
          /> 
        </FormField>
        <FormField>
          <Checkbox 
            radio 
            label='Every other week'
            name='checkboxRadioGroup2'
            value='biweekly'
            checked={recurrence === 'biweekly'}
            onChange={handleRecurrence}
            error={recurrenceError}
          /> 
        </FormField>
        <Form.Field>
          Would you like to add a dozen eggs?
        </Form.Field>
        <FormField>
          <Checkbox 
            radio 
            label='Yes (add $5)'
            name='checkboxRadioGroup'
            value='yes'
            checked={value === 'yes'}
            onChange={handleCheck}
            error={valueError}
          /> 
        </FormField>
        <FormField>
          <Checkbox 
            radio 
            label='No'
            name='checkboxRadioGroup'
            value='no'
            checked={value === 'no'}
            onChange={handleCheck}
            error={valueError}
          /> 
        </FormField>
        <Button 
          id="submitBtn" 
          color="blue" 
          type='submit'
          disabled={ !fullName || !phoneNumber || !recurrence || !value }
        >
          Submit
        </Button>
        {(formSuccess === true) ? <MessageSuccess></MessageSuccess> : null }
      </Form>
    </Container>
  )
};

export default App;