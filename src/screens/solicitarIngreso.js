import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Label,Text, Button,Textarea , Input} from 'native-base';
import {Modal, FlatList, ActivityIndicator, View, Alert,TextInput} from 'react-native';


var coordinador="";

export default class SolicitarIngresoScreen extends Component {

    

    constructor(props) {

    super(props);
    this.state = {
      semilleros:'',
      programas:'',
      coordinadores:'',
      coordinador:'',
      semillero: '',
      programa: '',
      modalVisible: false,
      nombreSemillero: '',
      descripcion: '',      
      isLoading: true,
      nombreSolicitante: '',
      correoSolicitante: '',
      comentarioSolicitante: ''
    };


  }

  handleInputChange =  name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  
  componentWillMount(){
     this.cargarProgramas();
     this.cargarSemilleros();
     this.cargarCoordinadores();
  }

  cargarSemilleros(){

    return fetch('https://api20190324075542.azurewebsites.net/api/SemilleroInvestigacions')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        semilleros: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });

  }

  cargarProgramas(){
    return fetch('https://api20190324075542.azurewebsites.net/api/Programas')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        programas: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });    
  }


  cargarCoordinadores(){
    return fetch('https://api20190324075542.azurewebsites.net/api/Integrantes/')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        coordinadores: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });     

  }

  
 
  buscarCoordinador(id){

    const {coordinadores} = this.state;
   
    Object.keys(coordinadores).map((item,index) => {
      if(coordinadores[item].Id==id){
         coordinador = coordinadores[item].Nombre;
      }
    })
  }
  

  onValueChangePrograma(value) {
    this.setState({
      programa: value
    });
  }

  onValueChangeSemillero(value) {
    this.setState({
      semillero: value
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  enviar(){
    const {nombreSolicitante,correoSolicitante,comentarioSolicitante} = this.state;

    Alert.alert("Tu solicitud se envió correctamente");

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        
        console.log('success', request.responseText);
      } else {
        
      }
    };
 
    request.open('GET','https://api20190415035024.azurewebsites.net/api/Solicituds?NombreIntegrante='+nombreSolicitante+'&correo='+correoSolicitante+'&descripcion='+comentarioSolicitante+'&Idintegrante=2&IdSemillero=18&IdCoordinador=4');
    request.send();

    Alert.alert("La notificación fue enviada al coordinador");  
      
  }


  render() { 

   // const  programasList = this.state.programas.map( (item,index) => <Picker.Item key={index} label={item.nombre} value={item.Id} />)

    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
    }


    return (
      <Container>
        <Header ><Text style={{color:'white'}}>Consultar Semillero</Text></Header>

        <Content>
          <Form>

          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View >
            
            <Header ><Text style={{color:'white'}}>Solicitar Ingreso</Text></Header>

        <Label style={{marginTop:'2%'}}>Nombre Semillero : {Object.keys(this.state.semilleros).map((item,index) => {if(this.state.semilleros[item].Id==this.state.semillero){return <Text key={index}>{this.state.semilleros[item].Nombre}</Text>}})} </Label>

             <Item>

                <TextInput
                  style={{height: 40,width:300,marginTop:20}}
                  onChangeText={(nombreSolicitante) => this.setState({nombreSolicitante})}
                  value={this.state.nombreSolicitante}
                  placeholder="Nombre solicitante"
                />

             </Item>   
             <Item>

             <TextInput
                  style={{height: 40,width:300,marginTop:20}}
                  onChangeText={(correoSolicitante) => this.setState({correoSolicitante})}
                  value={this.state.correoSolicitante}
                  placeholder="Correo solicitante"
                />
            </Item> 

            <Item>
              
            <TextInput
                  style={{height: 40,width:300,marginTop:20, borderColor: 'gray'}}
                  onChangeText={(comentarioSolicitante) => this.setState({comentarioSolicitante})}
                  value={this.state.comentarioSolicitante}
                  placeholder="Comentario (Opcional)"
                />  
            </Item>            



             <Button block style={{marginTop:'10%'}}  onPress={() => {this.enviar(); }}>
                <Text>Enviar Solicitud</Text>
            </Button>

              <Button block style={{marginTop:'5%'}}  onPress={() => {this.setModalVisible(!this.state.modalVisible);   }}>
                <Text>Cerrar</Text>
            </Button> 
            
          </View>
        </Modal>


            <Item picker style={{marginTop:'3%'}}>
              <Picker
                mode="dropdown"                
                style={{ width: undefined }}
                placeholder="Seleccionar Programa"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.programa}
                onValueChange={this.onValueChangePrograma.bind(this)}
              >
                <Picker.Item label="Seleccionar Programa" value="" />
                
                {Object.keys(this.state.programas).map((item,index) => {
                    return <Picker.Item key={index} label={this.state.programas[item].nombre} value={this.state.programas[item].Id} />

                })
                }
                
                
              </Picker>
            </Item>

            

            <Item picker style={{marginTop:'3%'}}>
              <Picker
                mode="dropdown"                
                style={{ width: undefined }}
                placeholder="Seleccionar Semillero"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.semillero}
                onValueChange={this.onValueChangeSemillero.bind(this)}
              >
                <Picker.Item label="Seleccionar Semillero" value="" />

                {Object.keys(this.state.semilleros).map((item,index) => {
                    return <Picker.Item key={index} label={this.state.semilleros[item].Nombre} value={this.state.semilleros[item].Id} />

                })
                }  

                
              </Picker>
            </Item>
                
                    
            <Label style={{marginTop:'10%'}}>Nombre Semillero: {Object.keys(this.state.semilleros).map((item,index) => {if(this.state.semilleros[item].Id==this.state.semillero){return <Text key={index}>{this.state.semilleros[item].Nombre}</Text>}})} </Label>
            <Label style={{marginTop:'2%'}}>Descripciòn: {Object.keys(this.state.semilleros).map((item,index) => {if(this.state.semilleros[item].Id==this.state.semillero){return <Text key={index}>{this.state.semilleros[item].ObjetivoGeneral}{this.buscarCoordinador(this.state.semilleros[item].Coordinador)}</Text>}})} </Label>
            <Label style={{marginTop:'2%'}}>Coordinador: <Text>{this.state.semillero ? coordinador : ''} </Text></Label>

            <Button block style={{marginTop:'16%'}}  onPress={() => {this.setModalVisible(!this.state.modalVisible); }}>
                <Text>Solicitar Ingreso Semillero</Text>
            </Button>


          </Form>
        </Content>
      </Container>
    );
  }
}