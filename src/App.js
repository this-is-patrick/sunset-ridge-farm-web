import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, Container, Header, FormField, Checkbox } from 'semantic-ui-react';
import './App.css';

function App() {
  const [fullName, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [recurrence, setRecurrence] = useState(null);
  const [value, setValue] = useState(null);

  const handleName = e => {
    setName(e.target.value);
  }
  const handlePhone = e => {
    setPhone(e.target.value);
  }
  const handleRecurrence = (event, {value}) => setRecurrence(value);
  const handleCheck = (event, {value}) => setValue(value);

  const handleSubmit = e => {
    e.preventDefault();
  
    var today = new Date(),
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

    console.log(date);

    const data = {
      name: fullName,
      phone: phoneNumber,
      recurrence: recurrence,
      eggs: value, 
      signupdate: date
    };
    
    console.log(data);

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

  return (
    <Container fluid className="container">
      <Header as='h1'>Sunset Ridge Farm</Header>
      <Header as='h2'>Vegetable Box Order Form</Header>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='First and Last Name' type="text" name="fullName" value={fullName} onChange={handleName} />
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder='555-555-5555' type="tel" name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={handlePhone} />
        </Form.Field>
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
          /> 
        </FormField>
        <Button color="blue" type='submit'>Submit</Button>
      </Form>
    </Container>
  )
};

function DropdownMenu() {
  
  function DropdownItem(props) {
    return (
      <a href="/#" className="menu-item">
        {props.children}
      </a>
    );
  }
  
  return(
    <div className="dropdown">
      <DropdownItem>DropdownItem</DropdownItem>
    </div>
  );
};

export default App;