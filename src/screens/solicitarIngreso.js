import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Label,Text, Button,Textarea , Input} from 'native-base';
import {Modal, FlatList, ActivityIndicator, View, Alert} from 'react-native';


var coordinador="";

export default class SolicitarIngresoScreen extends Component {

    

    constructor(props) {

    super(props);
    this.state = {
      semilleros:'',
      programas:'',
      coordinadores:'',
      coordinador:'',
      semillero: 'Cultura y dearrollo 2',
      programa: 'Ing en sistemas',
      modalVisible: false,
      nombreSemillero: '',
      descripcion: '',      
      isLoading: true,
      nombreSolicitante: 'Anyela',
      correoSolicitante: 'Anyela@uc.com',
      comentarioSolicitante: 'Me interesa la domotica'
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

    /*
    return fetch('https://api20190324075542.azurewebsites.net/api/Solicituds?NombreIntegrante={'+nombreSolicitante+'}&Correo={'+correoSolicitante+'}&DescripcionPorqueQuiereIngresar={'+comentarioSolicitante+'}&Idintegrante={'+6+'}&IdSemolleroInvestigacion={'+18+'}&Coordinador={'+4+'}')
    .then((response) => response.json())
    .then((responseJson) => {

        Alert.alert('success'+ responseJson);


    })
    .catch((error) =>{
      console.error(error);
    });  
    */


    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        //Alert.alert('success', request.responseText);
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };

    request.open('GET','https://api20190324075542.azurewebsites.net/api/Solicituds?NombreIntegrante={'+nombreSolicitante+'}&Correo={'+correoSolicitante+'}&DescripcionPorqueQuiereIngresar={'+comentarioSolicitante+'}&Idintegrante={'+6+'}&IdSemolleroInvestigacion={'+18+'}&Coordinador={'+4+'}');
    request.send();


    /*
    let data =  new FormData();
    
    data.append(" NombreIntegrante",nombreSolicitante);
    data.append(" Correo",correoSolicitante);
    data.append("  DescripcionPorqueQuiereIngresar",comentarioSolicitante);
    data.append("IdIntegrante",1);
    data.append(" IdSemolleroInvestigacion",18);
    data.append(" Coordinador",4);


    var request = new XMLHttpRequest();
    request.open('POST', 'https://api20190324075542.azurewebsites.net/api/Solicituds');
    request.send(data);
*/


/*
    fetch('https://api20190324075542.azurewebsites.net/api/Solicituds', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
	          Id:'',
            NombreIntegrante: nombreSolicitante,
            Correo: correoSolicitante,
            DescripcionPorqueQuiereIngresar: comentarioSolicitante,
            IdIntegrante:1.0,
	          IdSemolleroInvestigacion:18.0,
            Coordinador:4.0

        }),
        })  .then((response) => response.json())
            .then((responseJson) => {
            return responseJson;
            })
            .catch((error) => {
            console.error(error);
        });
*/

        Alert.alert("Mensaje: Solicitud Enviada al coordinador del semillero");      

       
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
                <Input onChange={this.handleInputChange('nombreSolicitante')} placeholder="Nombre solicitante" value={this.state.nombreSolicitante} />
             </Item>   
             <Item>
                <Input onChange={this.handleInputChange('correoSolicitante')}  placeholder="Correo solicitante" value={this.state.correoSolicitante}  />
             </Item>             

             <Textarea style={{marginTop:'4%'}} onChange={this.handleInputChange('comentarioSolicitante')} rowSpan={5} value={this.state.comentarioSolicitante}  bordered placeholder="Comentanos, ¿Por què quieres pertenecer a este semillero? (Opcional)" />

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
