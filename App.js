import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Otros from './src/screens/otros';
import SolicitarIngresoScreen from './src/screens/solicitarIngreso';



const TabNavigator = createBottomTabNavigator({
  Solicitar: SolicitarIngresoScreen,
  
  
});

export default createAppContainer(TabNavigator);