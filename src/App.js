import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      quantity: '',
      price: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }
  
  //This is a comment
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  
    axios.post('', this.state)
    .then(response => {
      console.log(response);
    })
    this.setState({ date: '', quantity: '', price: ''})
  }

  render() {
    const { date, quantity, price } = this.state;
    return (
      <Container fluid className="container">
        <Header as='h1'>Sunset Ridge Farm</Header>
        <Header as='h2'>Vegetable Box Order Form</Header>
        <Form className="form" onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Quantity Sold</label>
            <input placeholder='Quantity Sold' type="text" name="quantity" value={quantity} onChange={this.changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input placeholder='Price Per Item' type="text" name="price" value={price} onChange={this.changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Date</label>
            <input placeholder='Enter the date of sale' type="date" name="date" value={date} onChange={this.changeHandler} />
          </Form.Field>
          <Button color="blue" type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}