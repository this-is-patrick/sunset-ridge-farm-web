import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import './App.css';

function App() {
  const [fullName, setName] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [wantsEggs, setEggs] = useState('');
  const [date, setDate] = useState('');

  const handleName = e => {
    setName(e.target.value);
  }

  const handleRecurrence = e => {
    setRecurrence(e.target.value);
  }
  
  const handleEggs = e => {
    setEggs(e.target.value);
  }

  const handleDate = e => {
    setDate(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
  
    const data = {
      fullname: fullName,
      recurrence: recurrence,
      eggs: wantsEggs, 
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
    setRecurrence('');
    setEggs('');
    setDate('');
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
          <label>Recurrence</label>
          <input placeholder='Weekly or Bi-weekly' type="text" name="recurrence" value={recurrence} onChange={handleRecurrence} />
        </Form.Field>
        <Form.Field>
          <label>Eggs?</label>
          <input placeholder='Do you want eggs too?' type="text" name="wantsEggs" value={wantsEggs} onChange={handleEggs} />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input placeholder='Date' type="date" name="date" value={date} onChange={handleDate} />
        </Form.Field>
        <Button color="blue" type='submit'>Submit</Button>
      </Form>
    </Container>
  )
};

export default App;