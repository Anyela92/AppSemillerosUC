import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker,Text } from 'native-base';


export default class Otros extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <Container>
        <Header ><Text style={{color:'white'}}>Espacio para otros</Text></Header>
       
      </Container>
    );
  }
}